// Graphql Imports
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

// APIs
import awsmobile from "../apis/AppSync";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

// EmailJS
import emailjs from "emailjs-com";
import { service_id, crew_template_id, user_id } from "../apis/email_js";

Amplify.configure(awsmobile); // Configuring AppSync API

// Below is an example of the inputs to the createCrew function
// emails will be an array of email strings, crew_name will be a string,
// admin_user will be a username string, and color will be a string

// const emails = ["barkadosh1@gmail.com", "userdoesnotexist@gmail.com"];
// const crew_name = "Bar's Newest Crew!";
// const admin_user = "barkadosh";
// const color = "green";

// This function returns an empty json object if the object is undefined
// Otherwise, it parses the object into JSON format and returns it
export const parseObjectJSON = async (object) => {
  if (!object) {
    object = {};
  } else {
    object = JSON.parse(object);
  }
  return object;
};

// When an email is passed in, this function will return the username
// associated with that email
// If no user is found, it returns an empty string
export const getUsernameByEmail = async (email) => {
  const user_data = await API.graphql(
    graphqlOperation(queries.get_user_by_email, {
      input: email,
    })
  );

  const username_array = user_data.data.listUsersByEmail.items;
  const username_value =
    username_array.length > 0 ? username_array[0].username : "";
  return username_value;
};

// This function will take in a username and will return the user's crews
// in a JSON parsed format. If the user does not have a crew object, it
// will return {}
export const getCrewsByUsername = async (username) => {
  const user_data = await API.graphql(
    graphqlOperation(queries.get_user_data, {
      input: username,
    })
  );
  let crew_data = user_data.data.getCreateOnfourRegistration.crew;
  crew_data = await parseObjectJSON(crew_data);
  return crew_data;
};

// This function is the mutation that creates the actual crew object in the
// database and it returns the crew id of the newly created object
// It takes in the crew name, the object of users to be added to the crew,
// and the username of the admin user
export const createCrewObject = async (crew_name, added_users, admin_user) => {
  const crew_data = {
    name: crew_name,
    members: JSON.stringify(added_users),
    admin: admin_user,
  };

  const crew_returned_data = await API.graphql(
    graphqlOperation(mutations.create_crew, {
      input: crew_data,
    })
  );
  return crew_returned_data.data.createCrew.id;
};

// This function takes in a username and a crew_data object and it
// adds the crew_data object to the user's list of crews in the database
export const updateUserCrews = async (username, crew_data) => {
  const payload = {
    username,
    crew: JSON.stringify(crew_data),
  };

  API.graphql(
    graphqlOperation(mutations.update_user, {
      input: payload,
    })
  );
};

// This function takes in a crew id and a JSON object of crew members
// It updates the crew's members to contain this new JSON object of members
export const updateCrewUsers = async (crew_id, crew_members) => {
  const payload = {
    id: crew_id,
    members: JSON.stringify(crew_members),
  };

  API.graphql(
    graphqlOperation(mutations.update_crew, {
      input: payload,
    })
  );
};

// This function takes in a crew id and a crew name and updates the crew name
export const updateCrewName = async (crew_id, crew_name) => {
  const payload = {
    id: crew_id,
    name: crew_name,
  };

  API.graphql(
    graphqlOperation(mutations.update_crew, {
      input: payload,
    })
  );
};

// This function takes in a crew id and a crew admin username
// and updates the crew's admin
export const updateCrewAdmin = async (crew_id, crew_admin) => {
  const payload = {
    id: crew_id,
    admin: crew_admin,
  };

  API.graphql(
    graphqlOperation(mutations.update_crew, {
      input: payload,
    })
  );
};

// This is the function to call for the full createCrew flow
// It takes in emails, crew name, the admin username, and a color and
// creates a crew object and adds the crew id to each user's list of crews
export const createCrew = async (emails, crew_name, admin_user, color) => {
  // fetch the first name of the user creating the crew
  const user_data = await API.graphql(
    graphqlOperation(queries.get_user_data, {
      input: admin_user,
    })
  );
  const user_name = user_data.data.getCreateOnfourRegistration.first;
  // added_users will contain all usernames in the form email : username
  // all users will have an email key, but for users that can not be found in
  // the DB using the email, an empty string will be used as the username. If a
  // username is found, its value will be used
  let added_users = {};
  // verified_usernames will be a list of the usernames that are found using
  // the getUsernameByEmail query (only valid users)
  let verified_usernames = [];

  // creates a copy of the emails object. Later, the inviting user is removed from
  // this list so they don't receive an email being invited by themselves
  const emails_to_invite = [...emails];

  // for each email, get its associated username (or empty string if no associated
  // username) and add the combination to added_users. If it is a valid username
  // (meaning, non empty string), add that valued to verified_usernames
  for (let i = 0; i < emails.length; i++) {
    const current_email = emails[i];
    const current_username = await getUsernameByEmail(current_email);
    added_users[current_email] = current_username;
    if (current_username) verified_usernames.push(current_username);
    if (current_username === admin_user) emails_to_invite.splice(i, 1);
  }

  // function creates the crew and returns its ID
  const crew_id = await createCrewObject(crew_name, added_users, admin_user);

  // for each user, fetch the user's current list of crews. Edit this list
  // to contain the new crew (crew_id : color) and then call the mutation
  // to update the user's crew list in the database using this new list
  for (let i = 0; i < verified_usernames.length; i++) {
    const current_username = verified_usernames[i];
    const crew_data = await getCrewsByUsername(current_username);
    crew_data[crew_id] = color;
    await updateUserCrews(current_username, crew_data);
  }

  // Send emails to all of the emails added to the crew (excluding the user
  // that created the crew)
  await sendCrewInvites(user_name, emails_to_invite, crew_name);
};

// Returns a crew object. To access its components, use
// crew_data.data.getCrew.X, where X can be one of the following 4 values:
// admin, id, members, and name
export const getCrewObject = async (crew_id) => {
  const crew_data = await API.graphql(
    graphqlOperation(queries.get_crew_by_id, {
      input: crew_id,
    })
  );
  return crew_data;
};

// This function fetches the current crew object and a given user's current
// list of crews. It adds the user to the crew object's members, and it adds
// the crew to the user's list of crews
// inviter is the username of the user inviting someone to the crew
export const addUserToCrew = async (
  crew_id,
  username,
  email,
  color,
  inviter
) => {
  // fetch the first name of the user creating the crew
  const user_data = await API.graphql(
    graphqlOperation(queries.get_user_data, {
      input: inviter,
    })
  );
  const user_name = user_data.data.getCreateOnfourRegistration.first;

  const crew_data = await getCrewObject(crew_id);
  const crew_name = crew_data.data.getCrew.name;
  let crew_members = crew_data.data.getCrew.members;
  crew_members = await parseObjectJSON(crew_members);
  crew_members[email] = username;

  const users_crews = await getCrewsByUsername(username);
  users_crews[crew_id] = color;

  await updateCrewUsers(crew_id, crew_members);
  await updateUserCrews(username, users_crews);
  await sendCrewInvites(user_name, [email], crew_name);
};

// This function will change the color of a given user's selected crew
export const changeCrewColor = async (crew_id, username, color) => {
  const users_crews = await getCrewsByUsername(username);
  users_crews[crew_id] = color;
  await updateUserCrews(username, users_crews);
};

// This function will fetch a crew and delete the user with the
// given email from the crew object
export const removeUserFromCrew = async (email, crew_id) => {
  const crew_data = await getCrewObject(crew_id);
  let crew_members = crew_data.data.getCrew.members;
  crew_members = await parseObjectJSON(crew_members);
  delete crew_members[email];
  await updateCrewUsers(crew_id, crew_members);
};

// This function will fetch a user and delete the crew id from their
// list of crews
export const removeCrewFromUser = async (username, crew_id) => {
  let user_crews = await getCrewsByUsername(username);
  delete user_crews[crew_id];
  await updateUserCrews(username, user_crews);
};

// This function is used either to remove a user from a crew or when a user
// wants to leave a crew. It calls both the removeCrewFromUser and the
// removeUserFromCrew functions
export const leaveOrRemoveFromCrew = async (email, username, crew_id) => {
  await removeUserFromCrew(email, crew_id);
  if (username) await removeCrewFromUser(username, crew_id);
};

// This function will delete the crew object
// It will also delete the crew id from the crew list of each
// user that was in the crew
export const deleteCrew = async (crew_id) => {
  const crew_data = await getCrewObject(crew_id);
  const crew_members = crew_data.data.getCrew.members;
  const crew_members_JSON = await parseObjectJSON(crew_members);
  const crew_members_keys = Object.keys(crew_members_JSON);
  for (let i = 0; i < crew_members_keys.length; i++) {
    const username = crew_members_JSON[crew_members_keys[i]];
    if (username) {
      await removeCrewFromUser(username, crew_id);
    }
  }
  await API.graphql(
    graphqlOperation(mutations.delete_crew, {
      input: {
        id: crew_id,
      },
    })
  );
};

export const sendCrewInvites = async (user_name, emails, crew_name) => {
  for (let i = 0; i < emails.length; i++) {
    const template_params = {
      email_receipient: emails[i],
      reply_to: "onfour.box@gmail.com",
      friend_name: user_name,
      crew_name: crew_name,
      concert_link: "https://www.onfour.live/profile/",
    };
    setTimeout(() => {
      emailjs.send(service_id, crew_template_id, template_params, user_id);
    }, 1000);
  }
};
