import React from "react";
import "./Styles/header.css";
import Search from "./Search";
export default function Header() {
    return (
        <header className="header">
            <li>logo</li>
            <li className="flex-buffer"></li>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>
                <Search />
            </li>
            <li>Four</li>
        </header>
    );
}
