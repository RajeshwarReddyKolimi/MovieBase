import React, { useState, useRef, useEffect } from "react";
import env from "react-dotenv";
import "./Styles/slider.css";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
export default function Slider() {
    const sliderRef = useRef(null);
    const [slidePos, setSlidePos] = useState(0);
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
        sliderRef.current.style.transform = `translateX(${slidePos}vw)`;
        const intervalId = setInterval(() => {
            if (slidePos > -1000) {
                setSlidePos(slidePos - 100);
            } else {
                setSlidePos(0);
            }
        }, 2500);
        return () => {
            clearInterval(intervalId); 
        };
    }, [slidePos]);
    useEffect(() => {
        getList();
    }, []);
    async function getList() {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/trending/all/day?region=IN`,
                options
            );
            const data = await response.json();
            const results = await data.results;
            setList((prev) => [...results]);
            console.log(results);
        } catch (err) {
            console.error(err);
        }
    }
    function slideprev() {
        if (slidePos < 0) {
            setSlidePos(slidePos + 100);
        } else setSlidePos(-1000);
    }
    function slidenext() {
        if (slidePos > -1000) {
            setSlidePos(slidePos - 100);
        } else setSlidePos(0);
    }
    return (
        <div className="slider-container">
            <div className="slider" ref={sliderRef}>
                {list.map(
                    (li, key) =>
                        (li.media_type === "tv" ||
                            li.media_type === "movie") && (
                            <Link
                                to={
                                    li.media_type === "tv"
                                        ? `/info?type=Series&details=${JSON.stringify(
                                              li
                                          )}`
                                        : `/info?type=Movie&details=${JSON.stringify(
                                              li
                                          )}`
                                }
                                key={key}
                                className="slider-item"
                            >
                                <img
                                    className="slider-img"
                                    src={`https://image.tmdb.org/t/p/original${li.backdrop_path}`}
                                    alt="Image"
                                />
                                <div className="slider-info">
                                    {li.title && <h1>{li.title}</h1>}
                                    {li.name && <h1>{li.name}</h1>}
                                    {li.release_date && (
                                        <div className="slider-addi-info">
                                            <h5>
                                                {li.release_date.substring(
                                                    0,
                                                    4
                                                )}
                                            </h5>
                                            <h5>Movie</h5>
                                            {li.vote_average && (
                                                <div>
                                                    <h5>
                                                        {li.vote_average.toFixed(
                                                            1
                                                        )}
                                                    </h5>
                                                    <AiFillStar
                                                        style={{
                                                            color: "rgb(226, 176, 49)",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {li.first_air_date && (
                                        <div className="slider-addi-info">
                                            <h5>
                                                {li.first_air_date.substring(
                                                    0,
                                                    4
                                                )}
                                            </h5>
                                            <h5>Series</h5>
                                            {li.vote_average && (
                                                <div>
                                                    <h5>
                                                        {li.vote_average.toFixed(
                                                            1
                                                        )}
                                                    </h5>
                                                    <AiFillStar
                                                        style={{
                                                            color: "rgb(226, 176, 49)",
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )
                )}
            </div>
            <SlArrowLeft onClick={slideprev} className="slider-prev" />
            <SlArrowRight onClick={slidenext} className="slider-next" />
        </div>
    );
}
