import React, { useState } from "react";
import "./Styles/movieCard.css";
import ArtistPopup from "./ArtistPopup";
export default function PersonCard(props) {
    const [showDetails, setShowDetails] = useState(false);
    const { details } = props;
    return (
        <div>
            <div
                className="artist-card card"
                onClick={() => setShowDetails(true)}
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
                <h4>{details.original_name}</h4>
                <div>{details.known_for_department}</div>
            </div>
            {showDetails && (
                <ArtistPopup
                    details={details}
                    setShowDetails={setShowDetails}
                />
            )}
        </div>
    );
}
