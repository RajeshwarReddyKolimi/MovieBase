import React, { useState } from "react";
import "./Styles/header.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
export default function Header() {
    const [showItems, setShowItems] = useState(false);
    return (
        <nav className="header">
            <li>
                <Link
                    to="/"
                    className="app-title"
                    onClick={() => setShowItems(false)}
                >
                    MOVIE<span>BASE</span>
                </Link>
            </li>
            <ul className={`list-items ${showItems && "show-items"}`}>
                <Link to="/" onClick={() => setShowItems(false)}>
                    Home
                </Link>

                <Link to="/movies" onClick={() => setShowItems(false)}>
                    Movies
                </Link>

                <Link to="/series" onClick={() => setShowItems(false)}>
                    Series
                </Link>
            </ul>

            <li className="flex-buffer"></li>
            <li>
                <Search />
            </li>
            <IoIosMenu
                className="nav-menu"
                onClick={() => {
                    setShowItems((prev) => !prev);
                }}
            />
        </nav>
    );
}
