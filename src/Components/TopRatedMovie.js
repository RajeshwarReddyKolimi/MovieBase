import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
export default function TopRatedMovie() {
    const [popularMovie, setPopularMovie] = useState([]);
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
                `https://api.themoviedb.org/3/movie/top_rated`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setPopularMovie((prev) => [...results]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="trending-container">
            <CardContainer
                type="Movie"
                title="Top Rated Movies"
                cardList={popularMovie}
            />
        </div>
    );
}
