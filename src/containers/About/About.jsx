import React from "react";
import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image"; //esto lo añado para poder importar una imagen
import { Col, Container, Row } from "react-bootstrap";

import logo from "../../assets/logo.png";


const About = () => {

    return (
        <Container fluid className="aboutDesign">
            <Row className="row rowDesign">
                <Col className="col-12 col-md-6 col1 leftTarget d-flex justify-content-center align-items-center">

                    <div className="aboutTarget text-center">

                        <h3 className="tittleAbout">BACK TO THE 90s </h3>
                        <p className="p-3">
                            The best movies from the 90s show that, without them, it would be impossible to understand Hollywood's, and cinema as a whole, history. The wonderful 90s gave us many of our favourite movies and the best movie posters, that would end up decorating every teenage room in the world. <br/>From the best horror movies to the greatest musicals and the funniest Disney movies, SUPER EIGHT will help you celebrate the legacy of the most amazing decade. We've curated a list with the best of the best from a unique era, that shone in tacky clothing, Tamagotchi, <i>Saved by the Bell</i> and, as you can see, the best movies.
                            </p>

                    </div>

                </Col>

                <Col className="col-12 col-lg-4 col2 rightTarget d-flex align-items-center justify-content-center">


                    <div className="superEightTarget text-center">

                        <Image className="logoImageAbaut" src={logo}></Image>
                        <p className="p-3"> 
                        From <i>Pulp Fiction</i> to <i>Truman's Show</i>, <i>Toy Story</i> to <i>Titanic</i>, we've curated for you the best 90s movies, those that left their mark on a generation. Which is your favourite?
                        </p>
                        <p className="p-3"> 
                        If you're here, SUPER EIGHT is a videoclub catered exclusively for you. Either if you grew up watching the best movies from the 90s or want to get into that amazing era, we offer the opportunity to remember some of the best classics from then without leaving your couch. Hit play and enjoy!
                        </p>
                    </div>

                </Col>
            </Row>
        </Container>
    );

}


export default About;
