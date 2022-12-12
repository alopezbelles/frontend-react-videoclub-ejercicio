import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allMovies } from "../../services/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { addFilm, filmData } from "../../components/Films/filmSlice";
import { Col, Container, Row } from "react-bootstrap";

import "./Movies.css";
import FilmCard from "../../components/FilmCard/FilmCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickedMovie = (movie) => {
    dispatch(addFilm({ ...movie, details: movie }));
    navigate("/filmdetail");
  };

  const searchedFilm = useSelector(filmData);
  const films = searchedFilm.search;
  const query = searchedFilm.query;

  useEffect(() => {
    if (movies.length === 0) {
      allMovies().then((movies) => setMovies(movies));
    }
  });

  if (films.length !== 0 && query !== "") {
    return (
      <Container className="container homeDesign">
        <Row className="d-flex justify-content-center">
          {films.map((film, index) => {
            return (
              <Col
                key={index}
                 className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              >
                <FilmCard movie={film} clickedMovie={clickedMovie} />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  } else if (movies.length > 0) {
    return (
      <Container className="container homeDesign">
        <Row className="d-flex justify-content-center">
          {movies.map((movie, index) => {
            return (
              <Col
                key={index}
                className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              >
                <FilmCard
                  movie={movie}
                  clickedMovie={clickedMovie}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  } else {
    return (
      <div className="homeDesignEmpty">
        <span className="loader"></span>
      </div>
    );
  }
}

export default Movies;
