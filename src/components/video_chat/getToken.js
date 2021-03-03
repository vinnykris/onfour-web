const getToken = async(user_name, room_name) => {
    const DAILY_API_KEY =
      "removed-for-security";
    const fetch = require('isomorphic-fetch');
    // console.log(user_name, room_name)
    let response = await fetch(
        'https://api.daily.co/v1/meeting-tokens',
        {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + DAILY_API_KEY
            },
            body: JSON.stringify({
                "properties": {
                    "room_name": room_name,
                    "is_owner": true,
                    "user_name": user_name
                }
            })
        }
    );
    return (await response.json()).token;

}

export default getToken;

//
// create a meeting link tied to the room, valid for just the class
// time, for the student
//
// async function getMeetingLinkForStudent(room, start, end) {
//     let startTime = (new Date(start)).getTime() / 1000,
//         endTime = (new Date(end)).getTime() / 1000,
//         token = await createMeetingToken({
//             room_name: room.name,
//             nbf: startTime,
//             exp: endTime,
//             eject_at_token_exp: true
//         });
//     return room.url + '?t=' + token;
// }

// const getToken = async () => {
//     const data = JSON.stringify({
//         "properties": {
//             "room_name": "bar",
//             "is_owner": true,
//             "user_name": "takoyuxin"
//         }
//     });

//     const xhr = new XMLHttpRequest();

//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//             console.log(JSON.parse(this.responseText).token);
//             return (JSON.parse(this.responseText).token);
//         }
//     });

//     await xhr.open("POST", "https://api.daily.co/v1/meeting-tokens");
//     xhr.setRequestHeader("content-type", "application/json");
//     xhr.setRequestHeader("authorization", "Bearer 862b3778cdf7f6961d4a936e6f594cfbb0e79602b152f49f5645745310d135dd");

//     xhr.send(data);
// }


// export default getToken;
