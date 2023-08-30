import React from "react";
import MovieCard from "./MovieCard";
import "./Styles/movieCard.css";
import PersonCard from "./PersonCard";
export default function CardContainer(props) {
    let { cardList, type, title } = props;
    return (
        <div className="card-container">
            <h2>{title}</h2>
            <div className="card-slider">
                {type === "Movie" || type === "Series"
                    ? cardList.map((movie, key) => (
                          <MovieCard type={type} key={key} details={movie} />
                      ))
                    : cardList.map((person, key) => (
                          <PersonCard key={key} details={person} />
                      ))}
            </div>
        </div>
    );
}
