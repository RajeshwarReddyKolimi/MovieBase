import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import "./Styles/movieCard.css";
import MoviePopup from "./MoviePopup";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
    const { details, type } = props;
    const [showPopup, setShowPopup] = useState(false);
    const [year, setYear] = useState("");
    const [title, setTitle] = useState("");
    useEffect(() => {
        if (type === "Movie") {
            if (details.release_date)
                setYear(details.release_date.substring(0, 4));
            setTitle(details.title);
        } else {
            if (details.first_air_date)
                setYear(details.first_air_date.substring(0, 4));
            setTitle(details.name);
        }
    }, []);
    return (
        <Link
            to={`/info`}
            state={{ type: type, details: details }}
            className="card"
        >
            <img
                loading="lazy"
                className="movie-poster"
                src={`${
                    details.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w1280${details.poster_path}`
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                }`}
                alt={`${title}`}
            />
            <h4 className="card-rating">
                {details.vote_average.toFixed(1)}
                <AiFillStar style={{ color: "rgb(226, 176, 49)" }} />
            </h4>
            {year && <h4 className="card-year">{year}</h4>}
        </Link>
    );
}
