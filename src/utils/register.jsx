import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

export function containsUppercaseAndLowercase(str) {
  const uppercase_regex = new RegExp("[A-Z]+");
  const lowercase_regex = new RegExp("[a-z]+");
  if (uppercase_regex.test(str) == true && lowercase_regex.test(str) == true)
    return true;
  return false;
}

export function containsNumber(str) {
  const number_regex = new RegExp("[0-9]+");
  if (number_regex.test(str) == true) return true;
  return false;
}

export function containsSpecialCharacter(str) {
  const special_character_regex = new RegExp(
    "[\\^$*.\\[\\]{}\\(\\)?\\-\"!@#%&/,><':;|_~`]"
  );
  if (special_character_regex.test(str) == true) return true;
  return false;
}

export const determineUsername = async (user) => {
  return user.signInUserSession.idToken.payload["cognito:username"];
};

export const determineEmail = async (user) => {
  if (
    user?.signInUserSession?.idToken?.payload?.identities?.[0]?.providerType ===
    "Google"
  ) {
    return user.signInUserSession.idToken.payload.email;
  }
  return user.attributes.email;
};

export const determinePreferredUsername = async (user) => {
  if (
    user?.signInUserSession?.idToken?.payload?.identities?.[0]?.providerType ===
    "Google"
  ) {
    console.log("A REACHED", user.username);
    const user_data = await API.graphql(
      graphqlOperation(queries.get_user_data, {
        input: user.username,
      })
    );
    console.log("USER DATA IS", user_data);
    if (user_data?.data?.getCreateOnfourRegistration?.preferred_username)
      return user_data.data.getCreateOnfourRegistration.preferred_username;
    else return "";
  }
  console.log("B REACHED");
  return user.signInUserSession.idToken.payload.preferred_username;
};
