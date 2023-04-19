// Home.js
import React from 'react';
import "../App.css"
import {Container, Row, Col, Image} from 'react-bootstrap';


function Home(props)
{
    return (
        <div className="App">
            <Container fluid>
                <Row>
                    <Col>

                    </Col>
                    <Col>
                        <h4>Welcome to Group 4</h4>
                        <p>Monitor Patients Health Conditions</p>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default Home;