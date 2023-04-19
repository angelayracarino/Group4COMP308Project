import './App.css';
//
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  //Redirect,
  Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { UserContext } from './shared/UserContext';
import AlertList from './components/AlertList';
import CreateAlert from './components/CreateAlert';
import CreateSymptom from './components/CreateSymptom';

import EditVital from './components/EditVital';
import EditTip from './components/EditTip';
import Game from './components/Game';

//
function App() {

  return (
    <Router>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="Home">Inspected Areas with Issues</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              {/* <Nav.Link as={Link} to="/register">Register</Nav.Link> */}
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
              <Nav.Link as={Link} to="/alert-list">Alert List</Nav.Link>
              <Nav.Link as={Link} to="/create-alert">Create Alert</Nav.Link>
              <Nav.Link as={Link} to="/create-symptom">Create Symptom</Nav.Link>
              <Nav.Link as={Link} to="/edit-vital">Edit Vital</Nav.Link>
              <Nav.Link as={Link} to="/edit-tip">Edit Tip</Nav.Link>
              <Nav.Link as={Link} to="/game">Game</Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route path="/login" element={< Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/alert-list" element={<AlertList />} />
          <Route path="/create-alert" element={<CreateAlert />} />
          <Route path="/create-symptom" element={<CreateSymptom />} />
          <Route path="/edit-vital" element={<EditVital />} />
          <Route path="/edit-tip" element={<EditTip />} />
          <Route path="/game" element={<Game />} />

        </Routes>
      </div>



    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;

