import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilmCard from "../../components/FilmCard/FilmCard";
import {
  addFilm,
  directorData,
  filmData,
} from "../../components/Films/filmSlice";

function DirectedBy() {
  const moviesBy = useSelector(directorData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const clickedMovie = (movie) => {
    dispatch(addFilm({ ...movie, details: movie }));
    navigate("/filmdetail");
  };

  return (
    <Container className="container homeDesign">
      <Row className="d-flex justify-content-center">
        {moviesBy.map((movie, index) => {
          return (
            <Col
              key={index}
              className="col-10 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <FilmCard movie={movie} clickedMovie={clickedMovie} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default DirectedBy;
