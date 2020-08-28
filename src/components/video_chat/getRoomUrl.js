const getRoomUrl = async (room_name) => {
    const DAILY_API_KEY =
      "cf904922e02ef8957caba380503f4330c21f2fee04c125f5277cd80959e8ffc8";
    const fetch = require("isomorphic-fetch");

    let response = await fetch("https://api.daily.co/v1/rooms", {
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + DAILY_API_KEY,
      },
      body: JSON.stringify({
        properties: {
          max_participants: 6,
          autojoin: true,
          enable_knocking: false,
          enable_screenshare: false,
          enable_chat: false,
          start_video_off: false,
          start_audio_off: true,
          owner_only_broadcast: true,
          sfu_switchover: 2,
        },
        name: room_name,
        privacy: "public",
      }),
    });

    return await response.json();
};

export default getRoomUrl;