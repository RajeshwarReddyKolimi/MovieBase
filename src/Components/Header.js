import React, { useState } from "react";
import "./Styles/header.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
export default function Header(props) {
    const [showItems, setShowItems] = useState(false);
    return (
        <nav className="header">
            <li className="nav-menu-container">
                <IoIosMenu
                    className="nav-menu"
                    onClick={() => {
                        setShowItems((prev) => !prev);
                    }}
                />
            </li>
            <li>
                <Link
                    to="/"
                    className="app-title"
                    onClick={() => setShowItems(false)}
                >
                    MOVIE<span>BASE</span>
                </Link>
            </li>
            <li className="flex-buffer"></li>
            <ul className={`list-items ${showItems && "show-items"}`}>
                <Link
                    to="/"
                    className={`${props.selected === "Home" && "nav-selected"}`}
                    onClick={() => setShowItems(false)}
                >
                    Home
                </Link>
                <Link
                    to="/movies"
                    className={`${
                        props.selected === "Movie" && "nav-selected"
                    }`}
                    onClick={() => setShowItems(false)}
                >
                    Movies
                </Link>

                <Link
                    to="/series"
                    className={`${
                        props.selected === "Series" && "nav-selected"
                    }`}
                    onClick={() => setShowItems(false)}
                >
                    Series
                </Link>
            </ul>

            <li>
                <Link to="/search?query=" onClick={() => setShowItems(false)}>
                    <CgSearch className="search-icon" />
                </Link>
            </li>
        </nav>
    );
}
