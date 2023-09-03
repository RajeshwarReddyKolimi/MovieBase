import React, { useState, useEffect } from "react";
// import "./Styles/moviePopup.css";
import { MdClose } from "react-icons/md";
import env from "react-dotenv";
import { AiFillStar } from "react-icons/ai";
import CardContainer from "./CardContainer";
import { useSearchParams } from "react-router-dom";
export default function MoviePopup(props) {
    const [params, setParams] = useSearchParams();
    const details = JSON.parse(params.get("details"));
    const type = params.get("type");
    // const { details, type } = props;
    const [streamer, setStreamer] = useState({});
    const [director, setDirector] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [cast, setCast] = useState([]);
    const [year, setYear] = useState("");
    const [title, setTitle] = useState("");
    const [runtime, setRuntime] = useState(0);
    const [seasons, setSeasons] = useState(null);
    const [episodes, setEpisodes] = useState(null);
    const [opened, setOpened] = useState(false);

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
        if (!details) return;
        setOpened(true);
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
    }, [details]);
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
            // setStreamer({});
            if (!result) return;
            if (result.flatrate) {
                const set1 = new Set();
                result.flatrate.forEach((provider) => {
                    const logo = provider.logo_path;
                    const name = provider.provider_name;
                    set1.add({ logo, name });
                });
                setStreamer((prev) => ({ ...prev, free: Array.from(set1) }));
            }
            if (result.rent) {
                const set2 = new Set();
                result.rent.forEach((provider) => {
                    const logo = provider.logo_path;
                    const name = provider.provider_name;
                    set2.add({ logo, name });
                });
                setStreamer((prev) => ({ ...prev, rent: Array.from(set2) }));
            }
            if (result.buy) {
                const set3 = new Set();
                result.buy.forEach((provider) => {
                    const logo = provider.logo_path;
                    const name = provider.provider_name;
                    set3.add({ logo, name });
                });
                setStreamer((prev) => ({ ...prev, buy: Array.from(set3) }));
            }
            if (result.ads) {
                const set4 = new Set();
                result.ads.forEach((provider) => {
                    const logo = provider.logo_path;
                    const name = provider.provider_name;
                    set4.add({ logo, name });
                });
                setStreamer((prev) => ({ ...prev, ads: Array.from(set4) }));
            }
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
            setDirector([...data.created_by]);
            setTitle(data.name);
            setSeasons(data.number_of_seasons);
            setEpisodes(data.number_of_episodes);
            setGenreList([...data.genres]);
            setYear(() => {
                if (
                    data.first_air_date &&
                    data.last_air_date &&
                    data.first_air_date.substring(0, 4) !==
                        data.last_air_date.substring(0, 4)
                )
                    return (
                        data.first_air_date.substring(0, 4) +
                        "-" +
                        data.last_air_date.substring(0, 4)
                    );
                if (data.first_air_date)
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
            if (data.release_date) setYear(data.release_date.substring(0, 4));
            setRuntime(data.runtime);
            setGenreList([...data.genres]);
            setDirector([...data.created_by]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className={`movie-popup ${opened && "movie-popup-opened"}`}>
            <div className="movie-popup-buffer">
                <img
                    className="movie-image"
                    src={`${
                        details && details.backdrop_path !== null
                            ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
                            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAACFCAMAAABv9uS0AAAAA1BMVEUAAACnej3aAAAANUlEQVR4nO3BMQEAAADCoPVPbQZ/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAweyEAASeKOE8AAAAASUVORK5CYII="
                    }`}
                    alt={title}
                />
                <div className="image-overlay"></div>
                <div className="movie-details">
                    <div className="movie-details-buffer">
                        <h1 className="popup-movie-title">{title}</h1>
                        <div className="movie-header">
                            <h4 className="movie-year">{year}</h4>
                            <h4 className="movie-rating">
                                {details &&
                                    details.vote_average &&
                                    details.vote_average.toFixed(1)}
                                <AiFillStar
                                    style={{ color: "rgb(226, 176, 49)" }}
                                />
                            </h4>
                            {type === "Movie" && <h4>{runtime} min</h4>}
                            {type === "Series" && <h4>Seasons: {seasons}</h4>}
                            {type === "Series" && <h4>Episodes: {episodes}</h4>}
                        </div>
                        {genreList && (
                            <div className="genre-list">
                                <h4>Genre: </h4>
                                {genreList.map((genre, key) => (
                                    <h4 key={key}>{genre.name}</h4>
                                ))}
                            </div>
                        )}
                        <div className="movie-overview">
                            {details !== undefined && details.overview}
                        </div>
                    </div>
                </div>
            </div>
            <div className="stream-list">
                <h2 className="stream-header">Watch Options:</h2>
                {streamer.ads && (
                    <div className="stream-type">
                        <h3>Free</h3>
                        {streamer.ads.map((stream, key) => (
                            <td>
                                <img
                                    className="stream-img"
                                    key={key}
                                    src={`https://image.tmdb.org/t/p/original${stream.logo}`}
                                    alt="Logo"
                                    title={stream.name}
                                />
                            </td>
                        ))}
                    </div>
                )}
                {streamer.free && (
                    <div className="stream-type">
                        <h3>Subs</h3>
                        {streamer.free.map((stream, key) => (
                            <img
                                className="stream-img"
                                key={key}
                                src={`https://image.tmdb.org/t/p/original${stream.logo}`}
                                alt="Logo"
                                title={stream.name}
                            />
                        ))}
                    </div>
                )}
                {streamer.rent && (
                    <div className="stream-type">
                        <h3>Rent</h3>
                        {streamer.rent.map((stream, key) => (
                            <img
                                className="stream-img"
                                key={key}
                                src={`https://image.tmdb.org/t/p/original${stream.logo}`}
                                alt="Logo"
                                title={stream.name}
                            />
                        ))}
                    </div>
                )}
                {streamer.buy && (
                    <div className="stream-type">
                        <h3>Buy</h3>
                        {streamer.buy.map((stream, key) => (
                            <img
                                className="stream-img"
                                key={key}
                                src={`https://image.tmdb.org/t/p/original${stream.logo}`}
                                alt="Logo"
                                title={stream.name}
                            />
                        ))}
                    </div>
                )}
            </div>
            <CardContainer
                type="Artist"
                title="Created By"
                cardList={director}
            />
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
        </div>
    );
}
