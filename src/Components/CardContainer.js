import React from "react";
import MovieCard from "./MovieCard";
import "./Styles/movieCard.css";
import PersonCard from "./PersonCard";
export default function CardContainer(props) {
    let { cardList, type, title, display } = props;
    // if (type === "Movie") {
    //     cardList = cardList.filter((card) => {
    //         return card.vote_count > 2;
    //     });
    //     cardList = cardList.filter((card) => {
    //         return card.release_date;
    //     });
    // }
    return (
        <div>
            {cardList.length > 0 && (
                <div className="card-container">
                    <h3 className="card-container-title">{title}</h3>
                    <div
                        className={`${
                            display === "grid" ? "card-grid" : "card-slider"
                        }`}
                    >
                        {type === "Movie" || type === "Series"
                            ? cardList.map((movie, key) => (
                                  <MovieCard
                                      type={type}
                                      key={key}
                                      details={movie}
                                      display={display}
                                  />
                              ))
                            : cardList.map((person, key) => (
                                  <PersonCard
                                      key={key}
                                      details={person}
                                      display={display}
                                  />
                              ))}
                    </div>
                </div>
            )}
        </div>
    );
}
