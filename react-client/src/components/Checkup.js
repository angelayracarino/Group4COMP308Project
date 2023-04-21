import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function App() {
    const [data, setData] = useState({
        body_temperature: '',
        heart_rate: '',
        respiratory_rate: '',
        pulse_rate: ''
    });
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = "http://localhost:4000/run";

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setPrediction(null);
        axios.post(apiUrl, data)
            .then(res => {
                setPrediction(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }

    return (
        <div className="container">
            <div className="row" style={{ marginTop: 50 }}>
                <h2 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}><b>Diagnosis Checkup</b></h2>
                <hr />
                {/* Input form */}
                <div className="col-md-6 App" style={{ margin: 'auto', marginTop: 20 }}>
                    <div className="input-form App">
                        <h4 style={{ marginBottom: 20, fontFamily: 'sans-serif' }}><b>Please input data for prediction</b></h4>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group controlId="body_temperature" className='space-between d-flex align-items-start' required>
                                <Form.Label className='label-form'>Body Temperature</Form.Label>
                                <Form.Control className="control-form" type="number" placeholder="Enter body temperature" name="body_temperature" value={data.body_temperature} onChange={handleChange} required />
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="heart_rate" className='space-between d-flex align-items-start' required>
                                <Form.Label className='label-form'>Heart Rate</Form.Label>
                                <Form.Control type="number" name="heart_rate" placeholder="Enter heart rate" value={data.heart_rate} onChange={handleChange} required />
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="respiratory_rate" className='space-between d-flex align-items-start' required>
                                <Form.Label className='label-form'>Respiratory Rate</Form.Label>
                                <Form.Control type="number" name="respiratory_rate" placeholder="Enter respiratory rate" value={data.respiratory_rate} onChange={handleChange} required/>
                            </Form.Group>
                            <br></br>
                            <Form.Group controlId="pulse_rate" className='space-between d-flex align-items-start' required>
                                <Form.Label className='label-form'>Pulse Rate</Form.Label>
                                <Form.Control type="number" name="pulse_rate" placeholder="Enter pulse rate" value={data.pulse_rate} onChange={handleChange} required/>
                            </Form.Group>
                            <br></br>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Predict'}
                            </Button>
                        </Form>
                    </div>
                </div>

                {/* Prediction result */}
                <div className="col-md-6 App" style={{ margin: 'auto' }}>

                    <div className="prediction-result">
                        <h4 style={{ marginBottom: 20, fontFamily: 'sans-serif' }}><b>Predicted Result</b></h4>
                        <h6>The result of your diagnosis is: </h6>
                        <h3 className='diagnosis-result'>
                            {prediction && prediction.row1 && prediction.row1.length > 0
                                ? `${prediction.row1.indexOf(Math.max(...prediction.row1)) === 0
                                    ? 'You need to see a doctor!'
                                    : 'You are healthy!'
                                }`
                                : 'No prediction yet'
                            }
                        </h3>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;


