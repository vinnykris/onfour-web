// React imports
import React from "react";

//Component imports
import { useInputValue } from "../custom_hooks";

// Styles imports
import "./artist_form_styles.scss"

const ArtistForm = () => {

    const artist_name = useInputValue("");
    const artist_bio = useInputValue("");
    const artist_genre = useInputValue("");
    const artist_ins = useInputValue("");
    const artist_spotify = useInputValue("");
    const artist_twitter = useInputValue("");
    const artist_facebook = useInputValue("");
    const artist_soundcloud = useInputValue("");

    const handleSubmit = e => {
        e.preventDefault();
        // console.log(artist_name.value);
        // DO THE API MUTATIONS HERE
        // the value to pass in for each variable is variable_name.value
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
}

export default ArtistForm;