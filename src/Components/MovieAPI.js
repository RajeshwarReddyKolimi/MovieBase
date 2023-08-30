import React from "react";
import Header from "./Header";
import TrendingMovie from "./TrendingMovie";
import TrendingTV from "./TrendingTV";
import TrendingArtist from "./TrendingArtist";
import Discover from "./DiscoverMovie";

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
