import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function VitalSignsList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/dailyrecords";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);


  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner> }

      <h2 style={{textAlign: "center"}}>Vital Signs List </h2>
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Patient Email</th>
                <th>Nurse Practitioner</th>
                <th>Pulse Rate</th>
                <th>Blood Pressure</th>
                <th>Weight</th>
                <th>Body Temperature</th>
                <th>Respiratory Rate</th>
                <th>Submit Time</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
            <td>{item.patientEmail}</td>
            <td>{item.nurseUsername}</td>
            <td>{item.pulseRate}</td>
            <td>{item.bloodPressure}</td>
            <td>{item.weight}</td>
            <td>{item.temperature}</td>
            <td>{item.respiratoryRate}</td>
            <td >{item.creationTime}</td>
              </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(VitalSignsList);