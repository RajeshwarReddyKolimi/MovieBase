import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
export default function TrendingMovie() {
    const [trendingMovie, setTrendingMovie] = useState([]);
    const apiKey = env.API_KEY;
    const apiToken = env.API_TOKEN;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiToken}`,
        },
    };
    useEffect(() => {
        getMovies();
    }, []);
    async function getMovies() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/trending/movie/week`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setTrendingMovie((prev) => [...results]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="trending-container" style={{ marginTop: "5rem" }}>
            <CardContainer
                type="Movie"
                title="Trending Movies"
                cardList={trendingMovie}
            />
        </div>
    );
}
