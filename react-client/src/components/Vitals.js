//Imports
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';


//Create a gql for Vitals

const CREATE_VITALS = gql`
    mutation createVital(
        $bodyTemperature: number!
        $heartRate: number!
        $bloodPressure: number!
        $respiratoryRate: number!
        $pulseRate: number!
        $date: Date!
        $time: String!
    ) {
        createVital(
            bodyTemperature: $bodyTemperature
            heartRate: $heartRate
            bloodPressure: $bloodPressure
            respiratoryRate: $respiratoryRate
            pulseRate: $pulseRate
            date: $date
            time: $time
        ) {
            bodyTemperature
            heartRate
            bloodPressure
            respiratoryRate
            pulseRate
            date
            time
        }
    }
`;

//Create a component for Vitals
const CreateVital = () => {
    const [bodyTemperature, setBodyTemperature] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [pulseRate, setPulseRate] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    
    const clearState = () => {
        setBodyTemperature('');
        setHeartRate('');
        setBloodPressure('');
        setRespiratoryRate('');
        setPulseRate('');
        setDate('');
        setTime('');
    };

    const [createVital, { loading }] = useMutation(CREATE_VITALS);

    const handleSubmit = (event) => {
        e.preventDefault();
        if(
            bodyTemperature === '' ||
            heartRate === '' ||
            bloodPressure === '' ||
            respiratoryRate === '' ||
            pulseRate === '' ||
            date === '' ||
            time === ''
        ) {
            toast.error('Please fill in all fields');
        } else {
            createVital({
                variables: {
                    bodyTemperature: bodyTemperature,
                    heartRate: heartRate,
                    bloodPressure: bloodPressure,
                    respiratoryRate: respiratoryRate,
                    pulseRate: pulseRate,
                    date: date,
                    time: time
                    }
                    }).then(() => {
                        toast.success('Vitals added successfully');
                        clearState();
                    }).catch((error) => {
                        toast.error(error.message);
                    }
                );
            }
        };

        if (loading)
            return (
                <Container className='my-3 py-3'>
                    <p>Submitting...</p>
                </Container>
            );

        return (
            <div>
                <Container className='my-3 py-3'>
                    <Row>
                    <Col md={{ span: 4, offset: 4 }} className='p-4 custom-shadow' style={{background:"lightGrey"}}>
						<h4 className='text-center'>Add Vitals</h4>
                        <Form className='my-3' onSubmit={handlesubmit} id='courseform'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Body Temperature</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter body temperature'
                                    value={bodyTemperature}
                                    onChange={(e) => setBodyTemperature(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Heart Rate</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter heart rate'
                                    value={heartRate}
                                    onChange={(e) => setHeartRate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Blood Pressure</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter blood pressure'
                                    value={bloodPressure}
                                    onChange={(e) => setBloodPressure(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Respiratory Rate</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter respiratory rate'
                                    value={respiratoryRate}
                                    onChange={(e) => setRespiratoryRate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Pulse Rate</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Enter pulse rate'
                                    value={pulseRate}
                                    onChange={(e) => setPulseRate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder='Enter date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    type='time'
                                    placeholder='Enter time'
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant='primary' type='submit'>
                                Submit
                            </Button>
                        </Form>
                    </Col>

                </Row>
            </Container>
            </div>
        );
    };

    export default CreateVital;
        

    