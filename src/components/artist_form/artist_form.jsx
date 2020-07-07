// React imports
import React, { useEffect, useState } from "react";

// Styles imports
import "./artist_form_styles.scss"

const ArtistForm = () => {
    return (
        <div className="artist-form-container">
            <form
                className="artist-form"
                action="/"
                id="artist-signup"
            >
                <h4 className="artist-form-header">Apply to Perform</h4>
                <label className="artist-label-text" for="artist_name_slot">
                    Your Artist Name*
                </label>
                <input
                    className="artist-form-input"
                    // type="email"
                    name="artist_name"
                    id="artist_name"
                    // value={email}
                    // onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <label className="artist-label-text" for="artist_bio_slot">
                    Artist Bio*
                </label>
                <input
                    className="artist-form-input"
                    // type="password"
                    name="artist_bio"
                    id="artist_bio"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <label className="artist-label-text" for="genre_slot">
                    Your Genre*
                </label>
                <input
                    className="artist-form-input"
                    // type="password"
                    name="genre"
                    id="genre"
                // value={password}
                // onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <label className="artist-label-text" for="ins_url_slot">
                    Instagram URL*
                </label>
                <input
                    className="artist-form-input"
                    // type="password"
                    name="insta_url"
                    id="insta_url"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                />
                <label className="artist-label-text" for="spotify_slot">
                    Spotify URL
                </label>
                <input
                    className="artist-form-input"
                    // type="password"
                    name="apotify_URL"
                    id="spotify_url"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                />
                <label className="artist-label-text" for="twitter_url_slot">
                    Twitter URL
                </label>
                <input
                    className="artist-form-input"
                    // type="password"
                    name="twitter_url"
                    id="twitter_url"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                />
                <label className="artist-label-text" for="facebool_url_slot">
                    Facebook URL
                </label>
                <input
                    className="artist-form-input"
                    // type="password"
                    name="facebool_url"
                    id="facebool_url"
                    // value={password}
                    // onChange={(event) => setPassword(event.target.value)}
                />
                <label className="artist-label-text" for="soundcloud_url_slot">
                    Soundcloud URL
                </label>
                <input
                    className="artist-form-input"
                    // type="password"
                    name="soundcloud_url"
                    id="soundcloud_url"
                // value={password}
                // onChange={(event) => setPassword(event.target.value)}
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