import getAllRooms from "./getAllRooms";
/**
 * - Create rooms by invoking the Daily.co REST API from your own backend server
 *   (or from the Daily.co dashboard if you're OK with creating rooms manually).
 * - Pass an "exp" (expiration) parameter to the Daily.co REST endpoint so you
 *   don't end up with a huge number of live rooms.
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily.co REST API to create rooms.
 */
async function createRoom() {
  // let response = await fetch(newRoomEndpoint),
  //     room = await response.json();
  // return room;

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let room_response = await getAllRooms();
  const random_room_id = getRandomInt(room_response.total_count);
  // console.log(room_response.data[random_room_id].name);
  return {
    url: "https://onfour.daily.co/" + room_response.data[random_room_id].name,
  };
}

export default { createRoom };
