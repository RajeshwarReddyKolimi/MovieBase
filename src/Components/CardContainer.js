import React from "react";
import MovieCard from "./MovieCard";
import "./Styles/movieCard.css";
import PersonCard from "./PersonCard";
export default function CardContainer(props) {
    let { cardList, type, title } = props;
    return (
        <div>
            {cardList.length > 0 && (
                <div className="card-container">
                    <h3 className="card-container-title">{title}</h3>

                    <div className="card-slider">
                        {type === "Movie" || type === "Series"
                            ? cardList.map((movie, key) => (
                                  <MovieCard
                                      type={type}
                                      key={key}
                                      details={movie}
                                  />
                              ))
                            : cardList.map((person, key) => (
                                  <PersonCard key={key} details={person} />
                              ))}
                    </div>
                </div>
            )}
        </div>
    );
}
