import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CREATE_SYMPTOMS = gql`
  mutation createSymptom($selectedSymptoms: [String]!) {
    createSymptom(selectedSymptoms: $selectedSymptoms) {
      selectedSymptoms
    }
  }
`;

const predefinedSymptoms = [
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

const CreateSymptom = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const clearState = () => {
    setSelectedSymptoms([]);
  };

  const [createSymptom, { loading }] = useMutation(CREATE_SYMPTOMS);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom');
    } else {
      createSymptom({
        variables: {
          selectedSymptoms: selectedSymptoms
        }
      }).then(() => {
        toast.success('Symptoms added successfully');
        clearState();
      }).catch((error) => {
        toast.error(error.message);
      });
    }
  };

  if (loading) {
    return (
      <Container className='my-3 py-3'>
        <p>Submitting...</p>
      </Container>
    );
  }

  return (
    <Container className='my-3 py-3'>
      <h1 className='text-center'>Symptoms</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Symptoms</Form.Label>
          <Row>
            {predefinedSymptoms.map((symptom, index) => (
              <Col key={index} xs={6} sm={4} md={3} lg={2}>
                <Form.Check
                  type='checkbox'
                  label={symptom}
                  name={symptom}
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setSelectedSymptoms([...selectedSymptoms, symptom]);
                    } else {
                      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
                    }
                  }}
                />
              </Col>
            ))}
          </Row>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateSymptom;
