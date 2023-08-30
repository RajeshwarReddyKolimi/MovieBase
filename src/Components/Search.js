import React, { useState, useEffect, useRef } from "react";
import "./Styles/search.css";
import { CgSearch } from "react-icons/cg";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
export default function Search() {
    const currentRef = useRef(null);
    const [searchMovie, setSearchMovie] = useState([]);
    const [searchTV, setSearchTV] = useState([]);
    const [searchPerson, setSearchPerson] = useState([]);
    const apiKey = env.API_KEY;
    const apiToken = env.API_TOKEN;
    const [showSearch, setShowSearch] = useState(false);
    const [page, setPage] = useState(1);
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
    };
    async function handleSearch(e) {
        e.preventDefault();
        setShowSearch(true);
        let query = currentRef.current.value;
        if (query.length === 0) setShowSearch(false);
        fetchData(query);
    }
    function fetchData(query) {
        fetchMovies(query);
        fetchSeries(query);
        fetchArtist(query);
        setPage((prev) => prev + 1);
        console.log(page);
    }
    async function fetchMovies(query) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${query}&page=1&per_page=40`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setSearchMovie((prev) => [ ...results]);
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchSeries(query) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/tv?query=${query}&page=1`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setSearchTV((prev) => [ ...results]);
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchArtist(query) {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/person?query=${query}&page=1`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setSearchPerson((prev) => [ ...results]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <form className="search" onSubmit={(e) => handleSearch(e)}>
            <input
                type="text"
                id="search-input"
                className="form-input"
                ref={currentRef}
            />
            <button type="submit">
                {" "}
                <CgSearch
                    className="search-icon"
                    onClick={(e) => handleSearch(e)}
                />
            </button>
            {showSearch && (
                <div className="search-div">
                    <button onClick={() => fetchData()}>Next</button>
                    <div className="search-container">
                        <CardContainer
                            type="Person"
                            title="Artists"
                            cardList={searchPerson}
                        />
                        <CardContainer
                            type="Movie"
                            title="Movies"
                            cardList={searchMovie}
                        />
                        <CardContainer
                            type="Series"
                            title="Series"
                            cardList={searchTV}
                        />
                    </div>
                </div>
            )}
        </form>
    );
}
