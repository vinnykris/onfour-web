/**
 * - Create rooms by invoking the Daily.co REST API from your own backend server
 *   (or from the Daily.co dashboard if you're OK with creating rooms manually).
 * - Pass an "exp" (expiration) parameter to the Daily.co REST endpoint so you
 *   don't end up with a huge number of live rooms.
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily.co REST API to create rooms.
 */
async function createRoom(is_public) {
  // let response = await fetch(newRoomEndpoint),
  //     room = await response.json();
  // return room;

  // Comment out the above and uncomment the below, using your own URL
  if (is_public) {
    return { url: "https://onfour.daily.co/room1" };
  } else {
    return { url: "https://onfour_test.daily.co/bar" };
  }
}

export default { createRoom };
