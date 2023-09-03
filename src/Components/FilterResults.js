import React, { useState, useEffect } from "react";
import "./Styles/filterResults.css";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { BsArrowUp } from "react-icons/bs";
export default function FilterResults(props) {
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
        type,
    } = props;
    const apiKey = env.API_KEY;
    const apiToken = env.API_TOKEN;
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
    };
    useEffect(() => {
        setResults([]);
        setPage(1);
        fetchResults();
    }, [props]);
    useEffect(() => {
        fetchResults();
    }, [page]);
    async function fetchResults() {
        let url =
            type === "Movie"
                ? `https://api.themoviedb.org/3/discover/movie?`
                : `https://api.themoviedb.org/3/discover/tv?`;

        url = url + `page=${page}&sort_by=${sort}&watch_region=IN&`;
        if (genre !== 0) {
            url = url + `with_genres=${genre}&`;
        }
        if (release_year >= 1800 && release_year <= 3000) {
            if (type === "Movie")
                url = url + `primary_release_year=${release_year}&`;
            else url = url + `first_air_date_year=${release_year}&`;
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
        const date = new Date();
        const yyyy = date.getFullYear().toString().padStart(4, "0");
        const mm = (date.getMonth() + 1).toString().padStart(2, "0");
        const dd = date.getDate().toString().padStart(2, "0");
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        url = url + `primary_release_date.lte=${formattedDate}`;
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const results = await data.results;
            setResults((prev) => [...prev, ...results]);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="filter-results">
            <CardContainer
                type={type}
                title=""
                cardList={results}
                display="grid"
            />
            <MdOutlineKeyboardDoubleArrowDown
                className="load-button"
                onClick={() => setPage((prev) => prev + 1)}
            />
            <BsArrowUp
                className="go-top"
                onClick={() => {
                    window.scrollTo(0, 0);
                }}
            />
        </div>
    );
}
