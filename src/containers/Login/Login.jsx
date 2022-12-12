
import React, { useState, useEffect } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { errorCheck } from "../../services/usefull";
import Image from "react-bootstrap/Image"; //esto lo añado para poder importar una imagen
import mouth from "../../assets/mouth.png";
import ray from "../../assets/ray.png";
import mouse from "../../assets/mouse.png"
import smile from "../../assets/smile.png"
import { Col, Container, Row } from "react-bootstrap";



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    empty: "",
    wrongCredentials: ""
  })

  let body = {
    email: user.email,
    password: user.password
  }

  const userLogin = async (body) => {
    let res = await axios.post(
      "https://videoclub-app-v2-production.up.railway.app/auth/login",
      body
    );

    let jwt = res.data.jwt;
    let credentials = {
      token: jwt,
    };

    localStorage.setItem("jwt", credentials.token);
    navigate("/");
  };

  const validateBody = (body) => {
    if (body.email !== "" && body.password !== "") { return true }
  }

  const submitLogin = (e) => {
    e.preventDefault();
    if (validateBody(body)) {
      userLogin(body)
        .then((created) => console.log(created))
        .catch((error) => {
          setUserError((prevState) => ({
            ...prevState,
            wrongCredentials: error.response.data.message,
          }));
        });
    } else {
      setUserError((prevState) => ({
        ...prevState,
        empty: "Check all fields are filled"
      }))
    }
  }

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const errorHandler = (field, value, type, password) => {
    let error = "";
    error = errorCheck(value, type, password);
    setUserError((prevState) => ({
      ...prevState,
      [field + "Error"]: error
    }))
  }

  return (

    <form
      onSubmit={(e) => submitLogin(e)}
      className="container-fluid loginDesign d-flex justify-content-center align-items-center"
    >
      <Container>
        <Row className="row align-items-center justify-content-center">
          <Col className="col-md-4 imagesLog">
             <Image className="smileImageLog zoom" src={smile}></Image>
             <Image className="rayImage zoom" src={ray}></Image>
             <Image className="mouthImage zoom" src={mouth}></Image>

          </Col>

          <Col className="col-9  col-lg-4 d-flex justify-content-center text-center align-items-center" id="inputsBox">

            <div>{userError.empty}</div>
            <div>{userError.wrongCredentials}</div>
            <h3 className="loginText">LOG IN </h3>
            <br />

            <input
              className="inputtDesign"
              type="email"
              name="email"
              placeholder="  Email ... |"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) =>
                errorHandler(e.target.name, e.target.value, "email")
              }
            />
            <div className="errorInput">{userError.emailError}</div>


            <input
              className="inputtDesign"
              type="password"
              name="password"
              placeholder="  Password ... |"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) =>
                errorHandler(e.target.name, e.target.value, "password")
              }
            />
            <div className="errorInput">{userError.passwordError}</div>


            <div className="col text-center align-items-center">

              <button className="buttonDesign">Log In</button>

            </div>
          </Col>

          <Col className="col-md-4 imagesLog">
            <Image className="mouseImage zoom" src={mouse}></Image>

          </Col>
          
        </Row>
      </Container>
    </form>


  )
}


export default Login;