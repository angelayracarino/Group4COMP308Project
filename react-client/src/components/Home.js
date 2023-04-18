// Home.js
import React from 'react';
import "../App.css"
import {Container, Col } from 'react-bootstrap';


function Home(props)
{
    return (
        <div className="App">
            <Container fluid>
                    <Col>
                        <h4>Group Project – Developing Apps Using Emerging Web Technologies</h4>
                        <p>Nurses monitor patients during the first week of their release from the hospital and also help the patients to monitor their daily activities</p>
                    </Col>
            </Container>

        </div>
    );
}

export default Home;
