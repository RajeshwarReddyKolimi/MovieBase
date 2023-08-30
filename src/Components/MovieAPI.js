import React from "react";
import Header from "./Header";
// import Discover from "./TrendingMovie";
import TrendingMovie from "./TrendingMovie";
import TrendingTV from "./TrendingTV";
import TrendingArtist from "./TrendingArtist";

export default function MovieAPI() {
    return (
        <div>
            <Header />
            <TrendingMovie />
            <TrendingTV />
            <TrendingArtist />
            {/* <Discover /> */}
        </div>
    );
}
