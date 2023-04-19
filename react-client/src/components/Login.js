import React, { useContext, useEffect, useState } from 'react';
import { gql, useMutation} from '@apollo/client';
import { Box, Button, Container, FormControl, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Authentication } from '../auth/auth';

const USER_LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      email
      role
      token
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUser, { loading, error }] = useMutation(USER_LOGIN, {
    onCompleted: (data) => {
      console.log(data);
      const { token, role } = data.loginUser;
      Authentication.setToken(token);
      if (role === 'patient') {
        window.location.href = '/home';
      } else if (role === 'nurse') {
        window.location.href = '/home'
      } else {
        window.location.href = '/home'
      }
    },
    onError: (error) => {
      console.log('error', error);
      toast.error(error.message, { autoClose: 3000 });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('creds', email, password);
    loginUser({ variables: { email, password } });
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
  );
};

export default Login;