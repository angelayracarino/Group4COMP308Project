// Imports
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

// Create a gql mutation for Symptom
const CREATE_SYMPTOM = gql`
    mutation createSymptom(
        $selectedSymptom: [String]!
        $patient: String!
        $date: String!
        $time: String!
    ) { 
        createSymptom(
            selectedSymptom: $selectedSymptom
            patient: $patient
            date: $date
            time: $time
        ) {
            selectedSymptom
            patient
            date
            time
        }
    }
`;

// Create a mutation for Symptom
function CreateSymptom() {
    let navigate = useNavigate();
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    let patient, date, time;
    const [createSymptom, { data, loading, error }] = useMutation(
      CREATE_SYMPTOM
  );

    const predefinedSymptom = [
        'Fever',
        'Cough',
        'Fatigue',
        'Headache',
        'Loss of taste or smell',
        'Sore throat',
        'Shortness of breath',
        'Muscle aches',
        'Nausea or vomiting',
        'Diarrhea',
        'Runny or stuffy nose',
        'Chills'
    ];

    const handleCheckboxChange = (event) => {
        const symptom = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        } else {
            setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createSymptom({
            variables: {
                selectedSymptom: selectedSymptoms,
                patient: patient.value,
                date: date.value,
                time: time.value
            }
        });
        setSelectedSymptoms([]);
        patient.value = '';
        date.value = '';
        time.value = '';
        navigate('/');
    };

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return (
        <div className="entryform">
            <form onSubmit={handleSubmit}>
              <Form.Group>
                    <Form.Label>Symptoms</Form.Label>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {predefinedSymptom.map((symptom, index) => (
                        <Form.Check
                            key={index}
                            inline
                            label={symptom}
                            value={symptom}
                            type="checkbox"
                            checked={selectedSymptoms.includes(symptom)}
                            onChange={handleCheckboxChange}
                        />
                    ))}
                    </div>
              </Form.Group>
                <Form.Group>
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={node => {
                            patient = node;
                        }}
                        placeholder="Enter patient name"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        ref={node => {
                            date = node;
                        }}
                        placeholder="Enter date"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        type="time"
                        ref={node => {
                            time = node;
                        }}
                        placeholder="Enter time"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default CreateSymptom;
