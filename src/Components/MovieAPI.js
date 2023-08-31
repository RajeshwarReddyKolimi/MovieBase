import React from "react";
import Header from "./Header";
import TrendingMovie from "./TrendingMovie";
import TrendingTV from "./TrendingTV";
import TrendingArtist from "./TrendingArtist";
import Discover from "./Discover";
import PopularMovie from "./PopularMovie";
import PopularArtist from "./PopularArtist";
import PopularTV from "./PopularTV";
import TopRatedTV from "./TopRatedTV";
import TopRatedMovie from "./TopRatedMovie";

export default function MovieAPI() {
    return (
        <div>
            <Header />
            <TrendingMovie />
            <TrendingTV />
            <TrendingArtist />
            <TopRatedMovie />
            <TopRatedTV />
            <PopularMovie />
            <PopularTV />
            <PopularArtist />
        </div>
    );
}
