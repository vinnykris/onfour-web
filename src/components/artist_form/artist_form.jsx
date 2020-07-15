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
        <label className="artist-label-text" for="artist_name_slot">
          Your Artist Name*
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
        <input
          className="artist-form-input"
          name="artist_bio"
          id="artist_bio"
          required
          {...artist_bio}
        />
        <label className="artist-label-text" for="genre_slot">
          Your Genre*
        </label>
        <input
          className="artist-form-input"
          name="genre"
          id="genre"
          required
          {...artist_genre}
        />
        <label className="artist-label-text" for="ins_url_slot">
          Instagram URL*
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
          Twitter URL
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
