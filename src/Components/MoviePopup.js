import React, { useState, useEffect } from "react";
import "./Styles/moviePopup.css";
import { MdClose } from "react-icons/md";
import env from "react-dotenv";
import { AiFillStar } from "react-icons/ai";
import CardContainer from "./CardContainer";
export default function MoviePopup(props) {
    const { details, setShowPopup, type } = props;
    const [streamer, setStreamer] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [cast, setCast] = useState([]);
    const [year, setYear] = useState("");
    const [title, setTitle] = useState("");
    const [runtime, setRuntime] = useState(0);
    const [seasons, setSeasons] = useState(null);
    const [episodes, setEpisodes] = useState(null);

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
        if (type === "Movie") {
            setYear(details.release_date.substring(0, 4));
            setTitle(details.title);
            getMovieDetails();
        } else {
            getTVDetails();
        }
        getStreamer();
        getSimilar();
        getCast();
    }, []);
    async function getStreamer(e) {
        let url = "";
        if (type === "Movie")
            url = `https://api.themoviedb.org/3/movie/${details.id}/watch/providers`;
        else
            url = `https://api.themoviedb.org/3/tv/${details.id}/watch/providers`;
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const result = await data.results.IN;
            if (!result) return;
            if (!result.flatrate) return;
            const set = new Set();

            result.flatrate.forEach((provider) => {
                const logo = provider.logo_path;
                const name = provider.provider_name;
                set.add({ logo, name });
            });
            setStreamer(Array.from(set));
        } catch (err) {
            console.error(err);
        }
    }
    async function getSimilar(e) {
        let url = "";
        if (type === "Movie")
            url = `https://api.themoviedb.org/3/movie/${details.id}/similar`;
        else url = `https://api.themoviedb.org/3/tv/${details.id}/similar`;

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const result = await data.results;
            setSimilar([...result]);
        } catch (err) {
            console.error(err);
        }
    }
    async function getCast(e) {
        let url = "";
        if (type === "Movie")
            url = `https://api.themoviedb.org/3/movie/${details.id}/credits`;
        else url = `https://api.themoviedb.org/3/tv/${details.id}/credits`;
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const result = await data.cast;
            setCast([...result]);
        } catch (err) {
            console.error(err);
        }
    }
    async function getTVDetails(e) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${details.id}`,
                options
            );
            const data = await response.json();
            setTitle(data.name);
            setSeasons(data.number_of_seasons);
            setEpisodes(data.number_of_episodes);
            setYear(() => {
                if (
                    data.last_air_date &&
                    data.first_air_date.substring(0, 4) !==
                        data.last_air_date.substring(0, 4)
                )
                    return (
                        data.first_air_date.substring(0, 4) +
                        "-" +
                        data.last_air_date.substring(0, 4)
                    );
                return data.first_air_date.substring(0, 4);
            });
        } catch (err) {
            console.error(err);
        }
    }
    async function getMovieDetails(e) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${details.id}`,
                options
            );
            const data = await response.json();
            setTitle(data.title);
            setYear(data.release_date.substring(0, 4));
            setRuntime(data.runtime);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div
            className="movie-popup-overlay"
            onClick={(e) => {
                if (e.target.className !== "movie-popup-overlay") return;
                setShowPopup(false);
            }}
        >
            <div className="movie-popup">
                <div className="movie-popup-buffer">
                    <img
                        className="movie-image"
                        src={`${
                            details.backdrop_path !== null
                                ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
                                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                        }`}
                        alt={title}
                    />
                    <div className="movie-details">
                        <div className="movie-details-buffer">
                            <h1 className="popup-movie-title">{title}</h1>
                            <div className="movie-header">
                                <h5 className="movie-year">{year}</h5>
                                <h5 className="movie-rating">
                                    {details.vote_average.toFixed(1)}
                                    <AiFillStar
                                        style={{ color: "rgb(226, 176, 49)" }}
                                    />
                                </h5>
                                {type === "Movie" && <h5>{runtime} min</h5>}
                                {type === "Series" && (
                                    <h5>Seasons: {seasons}</h5>
                                )}
                                {type === "Series" && (
                                    <h5>Episodes: {episodes}</h5>
                                )}
                            </div>
                            <div className="movie-overview">
                                {details.overview}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stream-list">
                    <div className="stream-header">Where to watch:</div>
                    {streamer.length === 0 ? (
                        <div className="stream-name">NA</div>
                    ) : (
                        streamer.map((stream, key) => (
                            <img
                                className="stream-img"
                                key={key}
                                src={`https://image.tmdb.org/t/p/original${stream.logo}`}
                                alt="Logo"
                                title={stream.name}
                            />
                        ))
                    )}
                </div>
                <CardContainer
                    type="Artist"
                    title="Cast and Crew"
                    cardList={cast}
                />
                <CardContainer
                    type={type}
                    title={`Similar ${type}`}
                    cardList={similar}
                />
                <MdClose
                    className="movie-popup-close"
                    onClick={() => {
                        setShowPopup(false);
                    }}
                />
            </div>
        </div>
    );
}
