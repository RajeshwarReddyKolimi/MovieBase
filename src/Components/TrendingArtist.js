import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
export default function TrendingArtist() {
    const [trendingArtist, setTrendingArtist] = useState([]);
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
        getArtists();
    }, []);
    async function getArtists() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/trending/person/week`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setTrendingArtist((prev) => [...results]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="trending-container">
            <CardContainer
                type="Artist"
                title="Trending Artists"
                cardList={trendingArtist}
            />
        </div>
    );
}
