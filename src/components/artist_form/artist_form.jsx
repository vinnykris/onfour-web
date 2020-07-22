// Main Imports
import history from "../../history";

// React imports
import React, { useState, useEffect } from "react";

//Component imports
import { useInputValue } from "../custom_hooks";

// Styles imports
import "./artist_form_styles.scss";

// GraphQL
import * as mutations from "../../graphql/mutations";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

Amplify.configure(awsmobile); // Configuring AppSync API

const ArtistForm = () => {
  // Input form values
  const artist_name = useInputValue("");
  const artist_bio = useInputValue("");
  const artist_genre = useInputValue("");
  const artist_ins = useInputValue("");
  const artist_spotify = useInputValue("");
  const artist_twitter = useInputValue("");
  const artist_facebook = useInputValue("");
  const artist_soundcloud = useInputValue("");
  const artist_phone = useInputValue("");
  const refer_info = useInputValue("");

  // Error tracks the error message, username tracks the username of an
  // authenticated user, and auth tracks if a user is authenticated
  const [autherror, setAuthError] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [auth, setAuth] = useState(false);

  // Tracks if a user is logged in, and their username if so
  // Sets proper error message if not logged in
  useEffect(() => {
    Auth.currentAuthenticatedUser({})
      .then((user) => {
        setUsername(user.username);
        setAuth(true);
      })
      .catch((err) =>
        setAuthError("You must be logged in to submit this form.")
      );
  }, []);

  // Submits the form and updates a user's DB entry with updated submitted fields
  const handleSubmit = (e) => {
    e.preventDefault();

    const artist_form_payload = {
      username,
      artist_name: artist_name.value,
      artist_bio: artist_bio.value,
      genre: artist_genre.value,
      instagram: artist_ins.value,
      spotify: artist_spotify.value,
      twitter: artist_twitter.value,
      facebook: artist_facebook.value,
      soundcloud: artist_soundcloud.value,
      is_artist: true,
      phone: artist_phone.value,
      refer_note: refer_info.value,
    };

    if (auth) {
      API.graphql(
        graphqlOperation(mutations.update_user, {
          input: artist_form_payload,
        })
      )
        .then(() => {
          history.push("/stream");
        })
        .catch((err) => {
          setError(err.errors[0].message);
        });
    }

    setError(autherror);
  };

  return (
    <div className="artist-form-container">
      <form
        className="artist-form"
        action="/"
        id="artist-signup"
        onSubmit={handleSubmit}
      >
        <h4 className="artist-form-header">Apply to Perform</h4>
        <h7 className="artist-form-message">
          Thanks for your interest in performing on onfour! We deeply care about artists and recognize that your music and comfort come first. Please fill out and submit the form below to gain approval to perform. You should hear from our team within 1 or 2 business days.
        </h7>
        <br></br>
        <label className="artist-label-text" for="artist_name_slot">
          Artist Name*
        </label>
        <input
          className="artist-form-input"
          name="artist_name"
          id="artist_name"
          required
          {...artist_name}
        />
        <label className="artist-label-text" for="artist_bio_slot">
          Artist Bio*
        </label>
        <textarea
          className="artist-form-input artist-bio"
          name="artist_bio"
          form="artist-signup"
          // rows="4" 
          // cols="10" 
          wrap="soft"
          placeholder="Please include your full artist bio here. This will be populated for your concert descriptions that fans see."
          {...artist_bio}
        />
        {/* <input
          className="artist-form-input artist-bio"
          name="artist_bio"
          id="artist_bio"
          required
          placeholder="Please include your full artist bio here. This will be populated for your concert descriptions that fans see."
          {...artist_bio}
        /> */}
        <label className="artist-label-text" for="genre_slot">
          Genre*
        </label>
        <input
          className="artist-form-input"
          name="genre"
          id="genre"
          required
          {...artist_genre}
        />
        <label className="artist-label-text" for="phone_number_slot">
          Phone Number*
        </label>
        <input
          className="artist-form-input"
          name="phone_number"
          id="phone_number"
          {...artist_phone}
        />
        <label className="artist-label-text" for="ins_url_slot">
          Instagram Handle / URL*
        </label>
        <input
          className="artist-form-input"
          name="insta_url"
          id="insta_url"
          {...artist_ins}
        />
        <label className="artist-label-text" for="spotify_slot">
          Spotify URL
        </label>
        <input
          className="artist-form-input"
          name="apotify_URL"
          id="spotify_url"
          {...artist_spotify}
        />
        <label className="artist-label-text" for="twitter_url_slot">
          Twitter Handle / URL
        </label>
        <input
          className="artist-form-input"
          name="twitter_url"
          id="twitter_url"
          {...artist_twitter}
        />
        <label className="artist-label-text" for="facebool_url_slot">
          Facebook URL
        </label>
        <input
          className="artist-form-input"
          name="facebool_url"
          id="facebool_url"
          {...artist_facebook}
        />
        <label className="artist-label-text" for="soundcloud_url_slot">
          Soundcloud URL
        </label>
        <input
          className="artist-form-input"
          name="soundcloud_url"
          id="soundcloud_url"
          {...artist_soundcloud}
        />
        <label className="artist-label-text" for="refer_info_slot">
          How did you hear about onfour / who referred you?
        </label>
        <input
          className="artist-form-input"
          name="refer_info"
          id="refer_info"
          {...refer_info}
        />
        <div className="error-message">{error}</div>
        <button
          className="artist-form-submit-button"
          type="submit"
          form="artist-signup"
          value="Submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ArtistForm;