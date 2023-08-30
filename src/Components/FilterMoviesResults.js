import React, { useState, useEffect } from "react";
import "./Styles/filterResults.css";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
export default function FilterMoviesResults(props) {
    const {
        genre = 0,
        sort = "popularity.desc",
        release_year = 0,
        org_lang = "en",
        ott = 0,
        min_time = 0,
        max_time = 0,
        min_rating = 0,
        max_rating = 0,
    } = props;
    const apiKey = env.API_KEY;
    const apiToken = env.API_TOKEN;
    const [results, setResults] = useState([]);
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
    };
    useEffect(() => {
        fetchResults();
    }, [props]);
    async function fetchResults() {
        let url = `https://api.themoviedb.org/3/discover/movie?`;
        url = url + `sort_by=${sort}&watch_region=IN&`;
        if (genre !== 0) {
            url = url + `with_genres=${genre}&`;
        }
        if (release_year >= 1800 && release_year <= 3000) {
            url = url + `primary_release_year=${release_year}&`;
        }
        if (org_lang !== "") {
            url = url + `with_original_language=${org_lang}&`;
        }
        if (ott !== 0) {
            url = url + `with_watch_providers=${ott}&`;
        }
        if (min_time !== 0) {
            url = url + `with_runtime.gte=${min_time}&`;
        }
        if (max_time !== 0) {
            url = url + `with_runtime.lte=${max_time}&`;
        }
        if (min_rating !== 0) {
            url = url + `vote_average.gte=${min_rating}&`;
        }
        if (max_rating !== 0) {
            url = url + `vote_average.lte=${max_rating}&`;
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const results = await data.results;
            setResults((prev) => [...results]);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="filter-results">
            <CardContainer
                type="Movie"
                title="Search Results"
                cardList={results}
            />
        </div>
    );
}
