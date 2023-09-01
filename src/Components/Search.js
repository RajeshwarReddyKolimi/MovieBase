import React, { useState, useEffect, useRef } from "react";
import "./Styles/search.css";
import { CgSearch } from "react-icons/cg";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
import { Link } from "react-router-dom";
import "./Styles/filterResults.css";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { BsArrowUp } from "react-icons/bs";
export default function Search() {
    const currentRef = useRef(null);
    const [query, setQuery] = useState("");
    const [searchMovie, setSearchMovie] = useState([]);
    const [searchTV, setSearchTV] = useState([]);
    const [searchPerson, setSearchPerson] = useState([]);
    const apiKey = env.API_KEY;
    const apiToken = env.API_TOKEN;
    const [selected, setSelected] = useState("Movie");
    const [page, setPage] = useState(1);
    const [showMore, setShowMore] = useState(false);
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
    };
    useEffect(() => {
        setPage(1);
        setSearchMovie([]);
        setSearchPerson([]);
        setSearchTV([]);
        fetchData();
    }, [query]);
    useEffect(() => {
        fetchData();
    }, [page, selected]);
    function fetchData() {
        fetchMovies();
        fetchSeries();
        fetchArtist();
    }
    async function fetchMovies() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            if (results.length < 20) setShowMore(false);
            else setShowMore(true);
            setSearchMovie((prev) => [...prev, ...results]);
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchSeries() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/tv?query=${query}&page=${page}`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setSearchTV((prev) => [...prev, ...results]);
        } catch (err) {
            console.error(err);
        }
    }
    async function fetchArtist() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/person?query=${query}&page=${page}`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setSearchPerson((prev) => [...prev, ...results]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="search-page">
            <div className="search-header">
                <Link to="/" className="app-title">
                    MOVIE<span>BASE</span>
                </Link>
                <form
                    className="search"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setQuery(currentRef.current.value);
                    }}
                >
                    <input
                        type="text"
                        id="search-input"
                        className="form-input"
                        ref={currentRef}
                        onChange={(e) => {
                            setQuery(currentRef.current.value);
                        }}
                    />
                    <button type="submit">
                        {" "}
                        <CgSearch
                            className="search-icon"
                            onClick={(e) => {
                                setQuery(currentRef.current.value);
                                e.preventDefault();
                            }}
                        />
                    </button>
                </form>
            </div>
            <div className="search-div">
                <div className="search-options">
                    <button
                        className={`search-option ${
                            selected === "Movie" && "search-selected"
                        } `}
                        onClick={() => {
                            setSelected("Movie");
                            fetchMovies();
                        }}
                    >
                        Movies
                    </button>
                    <button
                        className={`search-option ${
                            selected === "Series" && "search-selected"
                        } `}
                        onClick={() => {
                            setSelected("Series");
                            fetchSeries();
                        }}
                    >
                        Series
                    </button>
                    <button
                        className={`search-option ${
                            selected === "Artist" && "search-selected"
                        } `}
                        onClick={() => {
                            setSelected("Artist");
                            fetchArtist();
                        }}
                    >
                        Artists
                    </button>
                </div>
                <div className="search-container">
                    {query &&
                        query !== "" &&
                        (selected === "Movie" ? (
                            <CardContainer
                                type="Movie"
                                title="Movies"
                                cardList={searchMovie}
                                display={"grid"}
                            />
                        ) : selected === "Series" ? (
                            <CardContainer
                                type="Series"
                                title="Series"
                                cardList={searchTV}
                                display={"grid"}
                            />
                        ) : (
                            <CardContainer
                                type="Person"
                                title="Artists"
                                cardList={searchPerson}
                                display={"grid"}
                            />
                        ))}
                    {query && query !== "" && showMore && (
                        <MdOutlineKeyboardDoubleArrowDown
                            className="load-button"
                            onClick={() => setPage((prev) => prev + 1)}
                        />
                    )}
                    <BsArrowUp
                        className="go-top"
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
