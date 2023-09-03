import React, { useState, useEffect, useRef } from "react";
import "./Styles/search.css";
import { CgSearch } from "react-icons/cg";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
import {
    Link,
    Navigate,
    useHistory,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import "./Styles/filterResults.css";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { BsArrowUp } from "react-icons/bs";
export default function Search() {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const [query, setQuery] = useState(params.get("query"));
    const currentRef = useRef(null);
    const [search, setSearch] = useState([]);
    const [searchTV, setSearchTV] = useState([]);
    const [searchPerson, setSearchPerson] = useState([]);
    const apiKey = env.API_KEY;
    const apiToken = env.API_TOKEN;
    const [selected, setSelected] = useState("movie");
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
        setSearch([]);
        fetchData();
    }, [selected]);
    useEffect(() => {
        fetchData();
    }, [page]);
    function handleSearch(e) {
        e.preventDefault();
        setQuery(currentRef.current.value);
        if (currentRef.current) {
            currentRef.current.blur();
        }
        setPage(1);
        setSearch([]);
        fetchData();
        navigate(`/search?query=${query}`);
    }
    async function fetchData() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/${selected}?query=${query}&page=${page}`,
                options
            );
            console.log(selected);
            const data = await response.json();
            const results = await data.results;
            if (results.length < 20) setShowMore(false);
            else setShowMore(true);
            setSearch((prev) => [...prev, ...results]);
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
                        handleSearch(e);
                    }}
                >
                    <input
                        defaultValue={query}
                        type="text"
                        id="search-input"
                        className="form-input"
                        ref={currentRef}
                        onChange={(e) => {
                            setQuery(currentRef.current.value);
                        }}
                        autoFocus
                    />
                    <button type="submit">
                        {" "}
                        <CgSearch
                            className="search-icon"
                            onClick={(e) => {
                                handleSearch(e);
                            }}
                        />
                    </button>
                </form>
            </div>
            <div className="search-div">
                <div className="search-options">
                    <button
                        className={`search-option ${
                            selected === "movie" && "search-selected"
                        } `}
                        onClick={() => {
                            setSelected("movie");
                        }}
                    >
                        Movies
                    </button>
                    <button
                        className={`search-option ${
                            selected === "tv" && "search-selected"
                        } `}
                        onClick={() => {
                            setSelected("tv");
                        }}
                    >
                        Series
                    </button>
                    <button
                        className={`search-option ${
                            selected === "person" && "search-selected"
                        } `}
                        onClick={() => {
                            setSelected("person");
                        }}
                    >
                        Artists
                    </button>
                </div>
                <div className="search-container">
                    {query &&
                        query !== "" &&
                        (selected === "movie" ? (
                            <CardContainer
                                type="Movie"
                                title=""
                                cardList={search}
                                display={"grid"}
                            />
                        ) : selected === "tv" ? (
                            <CardContainer
                                type="Series"
                                title=""
                                cardList={search}
                                display={"grid"}
                            />
                        ) : (
                            <CardContainer
                                type="person"
                                title=""
                                cardList={search}
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
