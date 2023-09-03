import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import CardContainer from "./CardContainer";
export default function HomeList(props) {
    const { type, title, endpoint } = props;
    const [list, setList] = useState([]);
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
        getList();
    }, []);
    async function getList() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/${endpoint}?region=IN&watch_region=IN`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setList((prev) => [...results]);
        } catch (err) {
            console.error(err);
        }
    }
    return <CardContainer type={type} title={title} cardList={list} />;
}
