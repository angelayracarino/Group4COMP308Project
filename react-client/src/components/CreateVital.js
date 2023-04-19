//Imports
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';


//Create a gql for Vitals

const CREATE_VITALS = gql`
    mutation createVital(
        bodyTemperature: number!
        heartRate: number!
        bloodPressure: number!
        respiratoryRate: number!
        pulseRate: number!
        date: Date!
        time: String!
        patient: String!
    ) {
        createVital(
            bodyTemperature: $bodyTemperature
            heartRate: $heartRate
            bloodPressure: $bloodPressure
            respiratoryRate: $respiratoryRate
            pulseRate: $pulseRate
            date: $date
            time: $time
            patient: $patient
        ) {
            bodyTemperature
            heartRate
            bloodPressure
            respiratoryRate
            pulseRate
            date
            time
            patient
        }
    }
`;

//Create a mutation for Vitals

const createVital = () => {

    let navigate = useNavigate();

    let bodyTemperature, heartRate, bloodPressure, respiratoryRate, pulseRate, date, time, patient;
    const [createVital, { data, loading, error}] = useMutation(CREATE_VITALS);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="entryform">
            <form 
                onSubmit={e => {
                    e.preventDefault();
                    createVital({ variables: { bodyTemperature : bodyTemperature.value, heartRate : heartRate.value, bloodPressure : bloodPressure.value, respiratoryRate : respiratoryRate.value, pulseRate : pulseRate.value, date : date.value, time : time.value, patient : patient.value } });

                    bodyTemperature.value = '';
                    heartRate.value = '';
                    bloodPressure.value = '';
                    respiratoryRate.value = '';
                    pulseRate.value = '';
                    date.value = '';
                    time.value = '';
                    patient.value = '';

                    navigate('/vitals');
                }}
            >
                <FormGroup>
                    <Form.Label>Body Temperature</Form.Label>
                    <Form.Control type="text" placeholder="Enter body temperature" ref={node => { bodyTemperature = node; }} />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Heart Rate</Form.Label>
                    <Form.Control type="text" placeholder="Enter heart rate" ref={node => { heartRate = node; }} />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control type="text" placeholder="Enter blood pressure" ref={node => { bloodPressure = node; }} />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Respiratory Rate</Form.Label>
                    <Form.Control type="text" placeholder="Enter respiratory rate" ref={node => { respiratoryRate = node; }} />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Pulse Rate</Form.Label>
                    <Form.Control type="text" placeholder="Enter pulse rate" ref={node => { pulseRate = node; }} />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter date" ref={node => { date = node; }} />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" placeholder="Enter time" ref={node => { time = node; }} />
                </FormGroup>

                <FormGroup>
                    <Form.Label>Patient</Form.Label>
                    <Form.Control type="text" placeholder="Enter patient" ref={node => { patient = node; }} />
                </FormGroup>

                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default createVital;
