import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import "./Styles/movieCard.css";
import MoviePopup from "./MoviePopup";

export default function MovieCard(props) {
    const { details, type } = props;
    const [showPopup, setShowPopup] = useState(false);
    const [year, setYear] = useState("");
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (type === "Movie") {
            setYear(details.release_date.substring(0, 4));
            setTitle(details.title);
        } else {
            setYear(details.first_air_date.substring(0, 4));
            setTitle(details.name);
        }
    }, []);
    return (
        <div>
            <div className="card" onClick={() => setShowPopup(true)}>
                <img
                    className="movie-poster"
                    src={`${
                        details.poster_path !== null
                            ? `https://image.tmdb.org/t/p/w1280${details.poster_path}`
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                    }`}
                    alt={`${title}`}
                />
                {/* <div className="movie-info">
                    <div className="rating">
                        <AiFillStar style={{ color: "rgb(226, 176, 49)" }} />
                        {details.vote_average.toFixed(1)}
                    </div>
                    {year}
                </div>
                <div className="movie-title">
                    <h4>{title}</h4>
                </div> */}
            </div>

            {showPopup && (
                <MoviePopup
                    type={type}
                    details={details}
                    setShowPopup={setShowPopup}
                />
            )}
        </div>
    );
}
