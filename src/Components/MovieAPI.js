import React from "react";
import Header from "./Header";
import TrendingArtist from "./TrendingArtist";
import PopularArtist from "./PopularArtist";
import HomeList from "./HomeList";
import Slider from "./Slider";
export default function MovieAPI() {
    return (
        <div>
            <Header selected="Home" />
            <div style={{ height: "5rem" }}></div>
            <Slider />
            <HomeList
                type="Movie"
                title="Trending Movies"
                endpoint="trending/movie/week"
            />
            <HomeList
                type="Series"
                title="Trending Series"
                endpoint="trending/tv/week"
            />
            <HomeList
                type="Movie"
                title="Top Rated Movies"
                endpoint="movie/top_rated"
            />
            <HomeList
                type="Series"
                title="Top Rated Series"
                endpoint="tv/top_rated"
            />
            <HomeList
                type="Movie"
                title="Popular Movies"
                endpoint="movie/popular"
            />
            <HomeList
                type="Series"
                title="Popular Series"
                endpoint="tv/popular"
            />
            <HomeList
                type="Movie"
                title="Recent Movies"
                endpoint="movie/now_playing"
            />
            <HomeList
                type="Series"
                title="Recent Series"
                endpoint="tv/airing_today"
            />
            <HomeList
                type="Movie"
                title="Upcoming Movies"
                endpoint="movie/upcoming"
            />
            <HomeList
                type="Series"
                title="Upcoming Series"
                endpoint="tv/on_the_air"
            />

            <TrendingArtist />

            <PopularArtist />
        </div>
    );
}
