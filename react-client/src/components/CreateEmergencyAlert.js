import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateEmergencyAlert(props) {
  const [emergency, setEmergency] = useState({ _id: '', emergencyCode: '', emergencySubject: '', 
  description: '', contactName: '', contactNumber: '', status: ''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/emergency/"+ props.match.params.email;

  const saveEmergency = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { emergencyCode: emergency.emergencyCode, 
        emergencySubject: emergency.emergencySubject, 
        description: emergency.description,
        contactName: emergency.contactName,
        contactNumber: emergency.contactNumber,
        creationTime: Date.now,
        status: "Active",
     };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/showEmergency/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setEmergency({...emergency, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron >
    <h3 style={{textAlign: "center", color: "green"}}>Send Us A Emergency Alert Whenever You Need Help!</h3>
        <Form onSubmit={saveEmergency} style={{marginLeft: 380}}>
          <Form.Group >
            <Form.Label> Emergency Code</Form.Label>
            <Form.Control type="text" name="emergencyCode" id="emergencyCode" placeholder="Enter emergency code" value={emergency.emergencyCode} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Emeregncy Subject</Form.Label>
            <Form.Control type="text" name="emergencySubject" id="emergencySubject" placeholder="Enter emergency subject" value={emergency.emergencySubject} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Description</Form.Label>
            <Form.Control type="text" name="description" id="description"  placeholder="Enter description" value={emergency.description} onChange={onChange} style={{width: 700}}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Name</Form.Label>
            <Form.Control type="text" name="contactName" id="contactName" placeholder="Enter contact name" value={emergency.contactName} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control type="text" name="contactNumber" id="contactNumber" placeholder="Enter contact number" value={emergency.contactNumber} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>

          <Button variant="primary" type="submit" style={{width: 700, marginTop: 30 }}>
            Send Emergency Alert
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateEmergencyAlert);