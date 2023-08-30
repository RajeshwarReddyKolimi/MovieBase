import React from "react";
import "./Styles/header.css";
import Search from "./Search";
import { Link } from "react-router-dom";
export default function Header() {
    return (
        <header className="header">
            <li>
                <Link to="/">Logo</Link>
            </li>
            <li className="flex-buffer"></li>
            <li>
                <Link to="/movies">Movies</Link>
            </li>
            <li>
                <Link to="/series">Series</Link>
            </li>
            <li>
                <Search />
            </li>
            <li>Four</li>
        </header>
    );
}
