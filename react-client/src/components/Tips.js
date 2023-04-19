//Imports
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';

//Create a gql for Tips

const CREATE_TIPS = gql`
    mutation createTips(
        $title: String!
        $description: String!
    }
    ) {
        createTip(
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

    if (loading)
        return (
            <Container className='my-3 py-3'>
                <p>Submitting...</p>
            </Container>
        );
        
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


            
