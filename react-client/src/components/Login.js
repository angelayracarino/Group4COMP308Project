
import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';

import {
  useAuthToken,
  useAuthUserToken,
  useAuthUserType,
} from "./config/auth";
// mutation for user login
const LOGIN_USER = gql`
mutation loginUser( $email: String!, $password: String! ) {
	loginUser( email: $email, password: $password)
  {
      email
      userType
      token
      _id
  }
}
`;

// Login function component
function Login() {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  let [email, setEmailOrUsername] = useState('');
  let [password, setPassword] = useState('');
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [__, setAuthUserToken, removeAuthUsertoken] = useAuthUserToken();
  const [___, setAuthUserType, removeAuthUserType] = useAuthUserType();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { 
          email, 
          password },
      });
      console.log('Logged in as:>>>>>>>>>>>', data);
      console.log('Logged in as:', data.loginUser);
      sessionStorage.setItem("username", data.loginUser.email);

      setAuthToken(data.login.token);
      setAuthUserToken(data.login.username);
      setAuthUserType(data.login.userType);
      window.location.href = '/home';
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <FormControl sx={{ mt: 1 }} fullWidth>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              color="primary"
              id="email"
              type="email"
            />
          </FormControl>
          <FormControl sx={{ mt: 1 }} fullWidth>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
              color="primary"
              id="password"
              type="password"
            />
          </FormControl>

              {loading ? <p style={{ color: 'blue' }}>Submitting</p> : <div></div>}
              {error ? <p style={{ color: 'red' }}>{error.message}</p> : <div></div>}
          <br />
          <br />
          <Box sx={{ mt: 2 }} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', width: '100%' }}>
            <div>
              <Button type="submit" color="primary" variant="contained" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            <Box sx={{ mt: 1 }}>
              <NavLink to={`/register`}>
                <span>Don't have an account?</span>
              </NavLink>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>


    </div>
  );
}
//
export default Login;