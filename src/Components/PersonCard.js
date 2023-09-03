import React, { useState } from "react";
import "./Styles/movieCard.css";
import ArtistPopup from "./ArtistPopup";
import { Link } from "react-router-dom";
export default function PersonCard(props) {
    const [showDetails, setShowDetails] = useState(false);
    const { details } = props;
    return (
        <Link
            to={`/artist?details=${JSON.stringify(details)}`}
            className="artist-card card"
        >
            <img
                src={`${
                    details.profile_path
                        ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                }`}
                alt="Profile_image"
                className="artist-image"
            />
            <h3>{details.name}</h3>
            <h4>{details.known_for_department}</h4>
        </Link>
    );
}
