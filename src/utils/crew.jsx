// Graphql Imports
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

// APIs
import awsmobile from "../apis/AppSync";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

Amplify.configure(awsmobile); // Configuring AppSync API

// Below is an example of the inputs to the createCrew function
// emails will be an array of email strings, crew_name will be a string,
// admin_user will be a username string, and color will be a string

// const emails = ["barkadosh1@gmail.com", "userdoesnotexist@gmail.com"];
// const crew_name = "Bar's Newest Crew!";
// const admin_user = "barkadosh";
// const color = "green";

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

// This function will take in a username and will return the user's crew
// in a JSON parsed format. If the user does not have a crew object, it
// will return {}
export const getCrewByUsername = async (username) => {
  const user_data = await API.graphql(
    graphqlOperation(queries.get_user_data, {
      input: username,
    })
  );
  let crew_data = user_data.data.getCreateOnfourRegistration.crew;
  if (!crew_data) {
    crew_data = {};
  } else {
    crew_data = JSON.parse(crew_data);
  }
  return crew_data;
};

// This function is the mutation that creates the actual crew object in the
// database and it returns the crew id of the newly created object
export const createCrewObject = async (crew_data) => {
  const crew_returned_data = await API.graphql(
    graphqlOperation(mutations.create_crew, {
      input: crew_data,
    })
  );
  return crew_returned_data.data.createCrew.id;
};

// This function takes in a username and a crew_data object and it
// adds the crew_data object to the user's list of crews in the database
export const addCrewToUser = async (username, crew_data) => {
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

// This is the function to call for the full createCrew flow
// It takes in emails, crew name, the admin username, and a color and
// creates a crew object and adds the crew id to each user's list of crews
export const createCrew = async (emails, crew_name, admin_user, color) => {
  // added_users will contain all usernames in the form email : username
  // all users will have an email key, but for users that can not be found in
  // the DB using the email, an empty string will be used as the username. If a
  // username is found, its value will be used
  let added_users = {};
  // verified_usernames will be a list of the usernames that are found using
  // the getUsernameByEmail query (only valid users)
  let verified_usernames = [];

  // for each email, get its associated username (or empty string if no associated
  // username) and add the combination to added_users. If it is a valid username
  // (meaning, non empty string), add that valued to verified_usernames
  for (let i = 0; i < emails.length; i++) {
    const current_email = emails[i];
    const current_username = await getUsernameByEmail(current_email);
    added_users[current_email] = current_username;
    if (current_username) verified_usernames.push(current_username);
  }

  // payload used to create the crew object
  const crew_data = {
    name: crew_name,
    members: JSON.stringify(added_users),
    admin: admin_user,
  };

  const crew_id = await createCrewObject(crew_data); // function creates the crew and returns its ID

  // for each user, fetch the user's current list of crews. Edit this list
  // to contain the new crew (crew_id : color) and then call the mutation
  // to update the user's crew list in the database using this new list
  for (let i = 0; i < verified_usernames.length; i++) {
    const current_username = verified_usernames[i];
    const crew_data = await getCrewByUsername(current_username);
    crew_data[crew_id] = color;
    await addCrewToUser(current_username, crew_data);
  }
};
