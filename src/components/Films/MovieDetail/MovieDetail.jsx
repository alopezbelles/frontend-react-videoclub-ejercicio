import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addByDirector, filmData } from "../filmSlice";
import { getByDirector, myLoans } from "../../../services/ApiCalls";
import { useNavigate } from "react-router-dom";
import "./MovieDetail.css";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const URL = "https://videoclub-app-v2-production.up.railway.app";


function MovieDetail() {
  const token = localStorage.getItem("jwt");

  const [loans, setLoans] = useState([]);
       const navigate = useNavigate();
       const dispatch = useDispatch();


   const loanMovie = async (body, token) => {
     const config = {
       headers: { Authorization: `Bearer ${token}` },
     };
     const bodyParameters = {
       id: body.id_movie,
     };
     try {
       let res = await axios.post(`${URL}/loans/movie`, bodyParameters, config);
       navigate("/");
     } catch (error) {
     }
   };

   const returnLoan = async (body, token) => {
     const config = {
       headers: { Authorization: `Bearer ${token}` },
     };
     const bodyParameters = {
       id: body.id_movie,
     };

     try {
       let res = await axios.patch(`${URL}/loans/end`, bodyParameters, config);
       navigate("/");
     } catch (error) {
       console.error(error);
     }
   };

  useEffect(() => {
    if(token){
      myLoans(token).then((loans) => setLoans(loans));
    }
  }, []);

  let myLoansIds = [];
  const getIds = () => {
    if(token){
      loans.map((loan) => {
        myLoansIds.push(loan.MovieIdMovie);
      });
    }
  };

  const selectedFilm = useSelector(filmData);

const handleDirector = () => {
  getByDirector(selectedFilm.director)
  .then((res) => {
    dispatch(addByDirector(res))
    navigate("/directed_by")
  })
}

  if (selectedFilm?.id_movie !== undefined) {
    getIds();

    return (
      <Container fluid className="containerHeight">
        <Row className="d-flex justify-content-center rowDetail">
          <Col className="col-9 col-md-6 d-flex justify-content-center align-items-center">
            <div id="cardDesignDetail">
              <img
                className="imageDetail"
                src={
                  "https://image.tmdb.org/t/p/w200/" + selectedFilm.poster_path
                }
                alt="movie poster"
              />
            </div>
          </Col>
          <Col
            className="col-12 col-md-6 d-flex justify-content-center align-items-center editTarget"
            id=""
          >
            <div className="filmDetailsCard">
              <p className="filmTitle">{selectedFilm.title.toUpperCase()}</p>
              <p className="textDetail linkDetail" onClick={handleDirector}>Directed by: {selectedFilm.director}</p>
              <p className="textDetail"> {selectedFilm.description}</p>
              {token &&
                myLoansIds.includes(selectedFilm.id_movie) === false && (
                  <div className="buttonPositioner">
                    <div
                      className="buttonDetail"
                      onClick={() => loanMovie(selectedFilm, token)}
                    >
                      Rent
                    </div>
                  </div>
                )}
              {myLoansIds.includes(selectedFilm.id_movie) && (
                <div className="buttonPositioner">
                  <div
                    className="buttonDetail"
                    onClick={() => returnLoan(selectedFilm, token)}
                  >
                    Return
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MovieDetail;
