import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import "./Styles/movieCard.css";
import TVPopup from "./TVPopup";
export default function TVCard(props) {
    const { details } = props;
    const [showMovie, setShowMovie] = useState(false);
    return (
        <div>
            <div className="card" onClick={() => setShowMovie(true)}>
                <img
                    className="movie-poster"
                    src={`${
                        details.poster_path !== null
                            ? `https://image.tmdb.org/t/p/w1280${details.poster_path}`
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                    }`}
                    alt={`${details.name}`}
                />
                <div className="movie-info">
                    <div className="rating">
                        <AiFillStar style={{ color: "rgb(226, 176, 49)" }} />
                        {details.vote_average.toFixed(1)}
                    </div>
                    {details.first_air_date.substring(0, 4)}
                </div>
                <div className="card-title">
                    <h4>{details.name}</h4>
                </div>
            </div>
            {showMovie && (
                <TVPopup setShowMovie={setShowMovie} details={details} />
            )}
        </div>
    );
}
