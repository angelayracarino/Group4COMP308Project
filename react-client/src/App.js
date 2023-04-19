import './App.css';
//
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//  npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CreateVital from './components/CreateVital';
import CreateTip from './components/CreateTip';
import VitalList from './components/VitalList';
import TipList from './components/TipList';
import EditVital from './components/EditVital';
import EditTip from './components/EditTip';
import CreateAlert from './components/CreateAlert';
import AlertList from './components/AlertList';
import Game from './components/Game';
//
function App() {

  return (
    <Router>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">Inspected Areas with Issues</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              {/* <Nav.Link as={Link} to="/register">Register</Nav.Link> */}
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/add-vitals">Create Vitals</Nav.Link>
              <Nav.Link as={Link} to="/vitals">Vitals</Nav.Link>
              <Nav.Link as={Link} to="/add-tip">Create Tip</Nav.Link>
              <Nav.Link as={Link} to="/tips">Tip List</Nav.Link>
              <Nav.Link as={Link} to="/add-alert">Create Alert</Nav.Link>
              <Nav.Link as={Link} to="/alerts">Alert List</Nav.Link>
              <Nav.Link as={Link} to="/fitness">Add Symptoms</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route path="/login" element={< Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/add-vitals" element={<CreateVital />} />
          <Route path="/vitals" element={<VitalList />} />
          <Route path="/edit-vital/:id" element={<EditVital />} />
          <Route path="/add-tip" element={<CreateTip />} />
          <Route path="/tips" element={<TipList />} />
          <Route path="/edit-tip/:id" element={<EditTip />} />
          <Route path="/add-alert" element={<CreateAlert />} />
          <Route path="/alerts" element={<AlertList />} />
          <Route path="/fitness" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
