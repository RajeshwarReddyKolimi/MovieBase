import React, { useState, useEffect, useRef } from "react";
import "./Styles/filterOptions.css";
import env from "react-dotenv";
import FilterSeriesResults from "./FilterṢeriesResults";

export default function FilterSeries() {
    const yearRef = useRef(null);
    const minRatingRef = useRef(null);
    const maxRatingRef = useRef(null);
    const minRuntimeRef = useRef(null);
    const maxRuntimeRef = useRef(null);
    const genreRef = useRef(null);
    const languageRef = useRef(null);
    const streamerRef = useRef(null);

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
        fetchAPI("genre/tv/list", setGenreList);
        fetchAPI("configuration/languages", setLanguagesList);
        fetchAPI("watch/providers/tv?watch_region=IN", setStreamersList);
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
    }

    return (
        <div className="filter-options">
            <form onSubmit={handleSubmit}>
                <h4>Filter</h4>
                <input
                    ref={yearRef}
                    className="text-input"
                    type="number"
                    placeholder="year"
                />
                <input
                    ref={minRatingRef}
                    className="text-input"
                    type="number"
                    placeholder="Minimum rating"
                    min={0}
                />
                <input
                    ref={maxRatingRef}
                    className="text-input"
                    type="number"
                    placeholder="Maximum rating"
                    max={10}
                />
                <input
                    ref={minRuntimeRef}
                    className="text-input"
                    type="number"
                    placeholder="Minimum runtime"
                    min={0}
                />
                <input
                    ref={maxRuntimeRef}
                    className="text-input"
                    type="number"
                    placeholder="Maximum runtime"
                />
                <select
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
                <button type="submit" className="button-input">
                    Search
                </button>
            </form>
            <FilterSeriesResults
                release_year={year}
                min_time={minRuntime}
                max_time={maxRuntime}
                min_rating={minRating}
                max_rating={maxRating}
                genre={genres}
                org_lang={language}
                ott={streamer}
            />
        </div>
    );
}
