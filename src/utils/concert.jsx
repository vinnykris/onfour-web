import { getOneConcert } from "../apis/get_concert_data";

export const didUserRSVP = async (concert_id, email) => {
  const concert = await getOneConcert(concert_id);
  const rsvp_list = concert?.rsvp_list;
  if (rsvp_list) {
    return rsvp_list.includes(email);
  } else return false;
};
