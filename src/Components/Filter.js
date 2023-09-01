import React, { useState, useEffect, useRef } from "react";
import "./Styles/filterOptions.css";
import FilterResults from "./FilterResults";
import env from "react-dotenv";
export default function Filter(props) {
    const yearRef = useRef(null);
    const minRatingRef = useRef(null);
    const maxRatingRef = useRef(null);
    const minRuntimeRef = useRef(null);
    const maxRuntimeRef = useRef(null);
    const genreRef = useRef(null);
    const languageRef = useRef(null);
    const streamerRef = useRef(null);
    const sortRef = useRef(null);

    const [showFilters, setShowFilters] = useState(false);
    const [year, setYear] = useState(0);
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(0);
    const [minRuntime, setMinRuntime] = useState(0);
    const [maxRuntime, setMaxRuntime] = useState(0);
    const [genreList, setGenreList] = useState([]);
    const [languagesList, setLanguagesList] = useState([]);
    const [streamersList, setStreamersList] = useState([]);
    const [genres, setGenres] = useState("");
    const [language, setLanguage] = useState("");
    const [streamer, setStreamer] = useState("");
    const [sort, setSort] = useState("");

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
        let urlType = props.type === "Movie" ? "movie" : "tv";
        fetchAPI(`genre/${urlType}/list`, setGenreList);
        fetchAPI("configuration/languages", setLanguagesList);
        fetchAPI(
            `watch/providers/${urlType}?watch_region=IN`,
            setStreamersList
        );
    }, []);

    async function fetchAPI(endpoint, setter) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/${endpoint}`,
                options
            );
            const data = await response.json();
            const results = data.results || data.genres || data;

            setter((prev) => [...results]);
        } catch (err) {
            console.error(err);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setYear(yearRef.current.value);
        setMinRating(minRatingRef.current.value);
        setMaxRating(maxRatingRef.current.value);
        setMinRuntime(minRuntimeRef.current.value);
        setMaxRuntime(maxRuntimeRef.current.value);
        setGenres(genreRef.current.value);
        setLanguage(languageRef.current.value);
        setStreamer(streamerRef.current.value);
        setSort(sortRef.current.value);
    }

    return (
        <div className="filter-options">
            <div style={{ marginTop: "5rem" }}></div>
            <div
                className={`${showFilters && "filter-overlay"}`}
                onClick={(e) => {
                    if (e.target.className !== "filter-overlay") return;
                    setShowFilters(false);
                }}
            >
                <div className={`filters ${showFilters && "show-filters"}`}>
                    <h4>Filters</h4>
                    <input
                        onChange={handleSubmit}
                        ref={yearRef}
                        className="text-input"
                        type="number"
                        placeholder="year"
                        min={1800}
                        max={2050}
                    />
                    <input
                        onChange={handleSubmit}
                        ref={minRatingRef}
                        className="text-input"
                        type="number"
                        placeholder="Rating from"
                        min={0}
                        max={10}
                    />
                    <input
                        onChange={handleSubmit}
                        ref={maxRatingRef}
                        className="text-input"
                        type="number"
                        placeholder="Rating to"
                        max={10}
                        min={0}
                    />
                    <input
                        onChange={handleSubmit}
                        ref={minRuntimeRef}
                        className="text-input"
                        type="number"
                        placeholder="Runtime from"
                        min={0}
                    />
                    <input
                        onChange={handleSubmit}
                        ref={maxRuntimeRef}
                        className="text-input"
                        type="number"
                        placeholder="Runtime to"
                        min={0}
                    />
                    <select
                        onChange={handleSubmit}
                        className="text-input"
                        ref={genreRef}
                        id="genresList"
                        name="genresList"
                    >
                        <option value="">Genre</option>
                        {genreList.map((genre, key) => (
                            <option key={key} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={handleSubmit}
                        className="text-input"
                        ref={languageRef}
                        id="langs"
                        name="langs"
                    >
                        <option value="">Language</option>
                        {languagesList.map((lang, key) => (
                            <option key={key} value={lang.iso_639_1}>
                                {lang.english_name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={handleSubmit}
                        className="text-input"
                        ref={streamerRef}
                        id="streamers"
                        name="streamers"
                    >
                        <option value="">Streamer</option>
                        {streamersList.map((streamer, key) => (
                            <option key={key} value={streamer.provider_id}>
                                {streamer.provider_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="sort">
                <h4>Sort by</h4>
                <select
                    onChange={handleSubmit}
                    className="text-input"
                    ref={sortRef}
                    id="sortType"
                    name="sortType"
                >
                    <option value="popularity.desc">Popularity </option>
                    <option value="vote_average.desc">Rating</option>
                    <option value="primary_release_date.desc">Year</option>
                </select>
                <div
                    className="filter-button"
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    Filters
                </div>
            </div>
            <FilterResults
                release_year={year}
                min_time={minRuntime}
                max_time={maxRuntime}
                min_rating={minRating}
                max_rating={maxRating}
                genre={genres}
                org_lang={language}
                ott={streamer}
                sort={sort}
                type={props.type}
            />
        </div>
    );
}
