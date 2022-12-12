import React from 'react'
import './FilmCard.css'

function FilmCard({movie, clickedMovie}) {
  if (movie.title.length > 12) {
    return (
      <div className="cardDesign">
        <p className="text">{movie.title.slice(0, 12) + "..."}</p>
        <img
          className="imageDesign"
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          onClick={() => clickedMovie(movie)}
        />
      </div>
    );
  } else {
    return (
      <div className="cardDesign">
        <p className="text">{movie.title}</p>
        <img
          className="imageDesign"
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          onClick={() => clickedMovie(movie)}
        />
      </div>
    );
  }
}

export default FilmCard