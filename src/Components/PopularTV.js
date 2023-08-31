import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
export default function PopularTV() {
    const [trendingTV, setTrendingTV] = useState([]);
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
        getTVs();
    }, []);
    async function getTVs() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/popular`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setTrendingTV((prev) => [...results]);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="trending-container">
            <CardContainer
                type="Series"
                title="Popular Series"
                cardList={trendingTV}
            />
        </div>
    );
}
