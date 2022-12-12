import React, { useState, useEffect } from "react";
import { homeMovies, myLoans } from "../../services/ApiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFilm, filmData } from "../../components/Films/filmSlice";
import { useJwt } from "react-jwt";
import { Col, Container, Row } from "react-bootstrap";
import FilmCard from "../../components/FilmCard/FilmCard";
import "./Home.css";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(token);

  const [movies, setMovies] = useState([]);
  const [loans, setLoans] = useState([]);

  const searchedFilm = useSelector(filmData);
  const films = searchedFilm.search;
  const query = searchedFilm.query;

  const clickedMovie = (movie) => {
    dispatch(addFilm({ ...movie, details: movie }));
    navigate("/filmdetail");
  };

  useEffect(() => {
    if (movies.length === 0) {
      homeMovies().then((movies) => setMovies(movies));
    }
  });

  useEffect(() => {
    if (token) {
      myLoans(token).then((loans) => setLoans(loans));
    }
  }, []);

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
  } else if (token && loans.length > 0) {
    return (
      <Container className="container homeDesign">
        <Row className="d-flex justify-content-center text-center">
          <div className="fw-bold fs-2">Hello, {decodedToken?.name}!</div>
          <div className="fw-bold fs-4">These are your loans</div>
        </Row>
        <Row className="d-flex justify-content-center">
          {loans.map((movie, index) => {
            return (
              <Col
                key={index}
                className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
              >
                <div className="d-flex flex-column">
                  <FilmCard movie={movie.Movie} clickedMovie={clickedMovie} />
                  <div className="dateCard">RENTED AT: {movie.date}</div>
                </div>
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
                className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center "
              >
                <FilmCard movie={movie} clickedMovie={clickedMovie} />
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
};

export default Home;
