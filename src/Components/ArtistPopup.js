import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import CardContainer from "./CardContainer";
import { MdClose } from "react-icons/md";
import "./Styles/moviePopup.css";
import env from "react-dotenv";
export default function ArtistPopup(props) {
    const { details, setShowDetails } = props;
    const [movieList, setMovieList] = useState([]);
    const [bio, setBio] = useState({});
    const apiKey = env.API_KEY;
    const apiToken = env.API_TOKEN;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
    };
    useEffect(() => {
        getMovieList();
        getDetails();
    }, []);
    async function getDetails() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/person/${details.id}`,
                options
            );
            const data = await response.json();
            setBio((prev) => ({
                ...prev,
                birthday: data.birthday,
                biography: data.biography,
            }));
        } catch (err) {
            console.error(err);
        }
    }
    async function getMovieList() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/person/${details.id}/movie_credits`,
                options
            );
            const data = await response.json();
            let result = await data.cast;
            result = [...new Set(result)];
            result.sort((a, b) => b.vote_average - a.vote_average);
            setMovieList(result);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div
            className="movie-popup-overlay"
            onClick={(e) => {
                if (e.target.className !== "movie-popup-overlay") return;
                setShowDetails(false);
            }}
        >
            <div className="movie-popup">
                <div className="artist-container">
                    <div>
                        <img
                            src={`${
                                details.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                            }`}
                            alt="Profile_image"
                            className="artist-popup-image"
                        />
                    </div>
                    <div className="artist-details">
                        <h2>{details.original_name}</h2>
                        <h4>{details.known_for_department}</h4>
                        <div>{details.gender === 1 ? "Female" : "Male"}</div>
                        <div>{bio.birthday}</div>
                        <div>{bio.biography}</div>
                    </div>
                </div>
                <CardContainer
                    type="Movie"
                    title="Famous Movies"
                    cardList={movieList}
                />
                <MdClose
                    className="movie-popup-close"
                    onClick={() => {
                        setShowDetails(false);
                    }}
                />
            </div>
        </div>
    );
}
