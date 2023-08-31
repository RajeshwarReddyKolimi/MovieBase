import React from "react";
import Header from "./Header";
import Filter from "./Filter";
import "./Styles/discover.css";
export default function Discover(props) {
    return (
        <div>
            <Header />
            <Filter type={props.type} />
        </div>
    );
}
