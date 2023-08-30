import React from "react";
import MovieCard from "./MovieCard";
import "./Styles/movieCard.css";
import TVCard from "./TVCard";
import PersonCard from "./PersonCard";
export default function CardContainer(props) {
    let { cardList, type, title } = props;
    return (
        <div className="card-container">
            <h2>{title}</h2>
            <div className="card-slider">
                {type === "Movie"
                    ? cardList.map((movie, key) => (
                          <MovieCard key={key} details={movie} />
                      ))
                    : type === "Series"
                    ? cardList.map((tv, key) => (
                          <TVCard key={key} details={tv} />
                      ))
                    : cardList.map((person, key) => (
                          <PersonCard key={key} details={person} />
                      ))}
            </div>
        </div>
    );
}
