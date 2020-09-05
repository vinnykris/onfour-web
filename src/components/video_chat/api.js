import getRoomUrl from "./getRoomUrl";
/**
 * - Create rooms by invoking the Daily.co REST API from your own backend server
 *   (or from the Daily.co dashboard if you're OK with creating rooms manually).
 * - Pass an "exp" (expiration) parameter to the Daily.co REST endpoint so you
 *   don't end up with a huge number of live rooms.
 *
 * See https://docs.daily.co/reference#create-room for more information on how
 * to use the Daily.co REST API to create rooms.
 */
async function createRoom(room_name, is_created) {
  // let response = await fetch(newRoomEndpoint),
  //     room = await response.json();
  // return room;

  // public_rooms stores the names of all existing public rooms
  const public_rooms = ["room1", "room2", "room3", "room4", "room5"];

  if (public_rooms.includes(room_name) || is_created) {
    return { url: "https://onfour.daily.co/" + room_name };
  } else {
    const random_id = Math.random();
    const random_room_id = "room" + random_id.toString(16).slice(2);
    
    let response_json = await getRoomUrl(random_room_id);
    return response_json;
  }
}

export default { createRoom };
