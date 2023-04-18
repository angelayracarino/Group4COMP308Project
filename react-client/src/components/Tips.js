//Imports
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';

//Create gql for Tips

const CREATE_TIP_MUTATION = gql`
    mutation createTip(
        $title: String!
        $description: String!
    ) {
        createTip(
            title: $title
            description: $description
        ) {
            _id
            title
            description
        }
    }
`;

//Create a function to create a new tip
const CreateTipForm = () => {

    let navigate = useNavigate();
    
    let title, description;
    const [createTip, { data, loading, error}] = useMutation(CREATE_TIP_MUTATION);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="entryform">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createTip({ variables: { title : title.value, description : description.value } });

                    title.value = '';
                    description.value = '';

                    navigate('/tips');
                }}
            >
            
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" ref={node => { title = node; }} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" ref={node => { description = node; }} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default CreateTipForm;
