const getAllRooms = async () => {
  const DAILY_API_KEY =
    "cf904922e02ef8957caba380503f4330c21f2fee04c125f5277cd80959e8ffc8";
  const fetch = require("isomorphic-fetch");

  let response = await fetch("https://api.daily.co/v1/rooms", {
    method: "get",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + DAILY_API_KEY,
    },
  });

  return await response.json();
};

export default getAllRooms;
