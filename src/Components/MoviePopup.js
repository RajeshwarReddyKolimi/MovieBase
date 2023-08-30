import React, { useState, useEffect } from "react";
import "./Styles/moviePopup.css";
import { MdClose } from "react-icons/md";
import env from "react-dotenv";
import { AiFillStar } from "react-icons/ai";
import CardContainer from "./CardContainer";
export default function MoviePopup(props) {
    const { details, setShowMovie } = props;
    const [streamer, setStreamer] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [cast, setCast] = useState([]);
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
        getStreamer();
        getSimilar();
        getCast();
    }, []);
    async function getStreamer(e) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${details.id}/watch/providers`,
                options
            );
            const data = await response.json();
            const result = await data.results.IN;
            if (!result) return;
            if (!result.flatrate) return;
            const set = new Set();

            result.flatrate.forEach((provider) => {
                const providerName = provider.provider_name;
                set.add(providerName);
            });
            setStreamer(Array.from(set));
        } catch (err) {
            console.error(err);
        }
    }

    async function getSimilar(e) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${details.id}/similar?limit=5`,
                options
            );
            const data = await response.json();
            const result = await data.results;
            setSimilar([...result]);
        } catch (err) {
            console.error(err);
        }
    }

    async function getCast(e) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${details.id}/credits`,
                options
            );
            const data = await response.json();
            const result = await data.cast;
            setCast([...result]);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div
            className="movie-popup-overlay"
            onClick={(e) => {
                if (e.target.className !== "movie-popup-overlay") return;
                setShowMovie(false);
            }}
        >
            <div className="movie-popup">
                <div className="popup-header">
                    <img
                        className="movie-image"
                        src={`${
                            details.backdrop_path !== null
                                ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
                                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                        }`}
                        alt={details.title}
                    />
                    <h1 className="popup-movie-title">{details.title}</h1>
                </div>
                <div className="movie-details">
                    <div className="movie-header">
                        <h3 className="movie-year">
                            {details.release_date.substring(0, 4)}
                        </h3>
                        <h3 className="movie-rating">
                            <AiFillStar
                                style={{ color: "rgb(226, 176, 49)" }}
                            />
                            {details.vote_average.toFixed(1)}
                        </h3>
                    </div>
                    <div className="stream-list">
                        Where to watch:
                        {streamer.length === 0 ? (
                            <div className="stream-name">No provider</div>
                        ) : (
                            streamer.map((stream, key) => (
                                <li key={key}>{stream}</li>
                            ))
                        )}
                    </div>
                    <div className="movie-overview">{details.overview}</div>
                    <CardContainer
                        type="Artist"
                        title="Cast and Crew"
                        cardList={cast}
                    />
                    <CardContainer
                        type="Movie"
                        title="Similar Movies"
                        cardList={similar}
                    />
                </div>

                <MdClose
                    className="movie-popup-close"
                    onClick={() => {
                        setShowMovie(false);
                    }}
                />
            </div>
        </div>
    );
}
