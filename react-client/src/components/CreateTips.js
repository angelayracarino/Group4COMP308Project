//Imports
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//
import { useNavigate } from 'react-router-dom';

//Create gql for Tips

const CREATE_TIPS = gql`
    mutation createTips(
        $title: String!
        $description: String!
    }
    ) {
        createTips(
            title: $title
            description: $description
        }
    ) {
        _id
        title
        description
    }
`;

//Create a function to create a new tip
const createTips = () => {

    let navigate = useNavigate();
    
    let title, description;
    const [createTips, { data, loading, error}] = useMutation(CREATE_TIPS);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="entryform">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    createTips({ variables: { title : title.value, description : description.value } });

                    title.value = '';
                    description.value = '';

                    navigate('/tips');
                }}
            >
            
            <FormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" ref={node => { title = node; }} />
            </FormGroup>

            <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" ref={node => { description = node; }} />
            </FormGroup>

            <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default createTips;


            
