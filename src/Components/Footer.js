import React from "react";

export default function Footer() {
    return (
        <div style={{ fontSize: "10px", color: "white" }}>
            Disclaimer: The data displayed in this site is taken from TMDB API.
            The data may not be accurate. The rating mentioned in this site is
            not IMDB rating but the rating from TMDB API. The main purpose of
            this project is to learn, understand, work with APIs. If the page
            says page not found from Netlify, kindly please go to home page and
            navigate again. This happens when the non home page of the site is
            reloaded, because of hosting platform.
        </div>
    );
}
