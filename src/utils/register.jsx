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
