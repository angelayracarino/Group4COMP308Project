import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
    Box, 
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography 
} from '@mui/material';
import { gql, useMutation} from '@apollo/client';
//import { UserContext } from '../shared/UserContext';

const CREATE_USER = gql`
    mutation createUser(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
        $address: String!
		$city: String!
        $province: String!
		$postalCode: String!
        $phone: String!
        $role: String!
    ) {
        createUser(
            firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
            address: $address
			city: $city
            province: $province
			postalCode: $postalCode
            phone: $phone
            role: $role
        ) {
            _id
            firstName
			lastName
			email
			password
            address
			city
            province
			postalCode
            phone
            role
        }
    }
`;

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
	const [role, setRole] = useState('');

    const navigate = useNavigate();

    const clearState = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
        setAddress('');
		setCity('');
		setProvince('');
		setPostalCode('');
        setPhone('');
        setRole('');
	};

    const [createUser, {loading} ] = useMutation(CREATE_USER);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			password === '' ||
            address === '' ||
			city === '' ||
            province === '' ||
            postalCode === '' ||
			phone === '' ||
            role === ''
		) {
			toast.error('Please Fill Personal Information!!');
		} else {
			createUser({
				variables: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
                    address: address,
					city: city,
					province: province,
                    postalCode: postalCode,
                    phone: phone,
                    role: role,
				},
			})
				.then(() => {
					toast.success('User Added');
					clearState();
				})
				.catch((error) => {
					toast.error(error.message);
				});
		}
    };

    if (loading)
		return (
			<Container className='my-3 py-3'>
				<p>Submitting...</p>
			</Container>
		);

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}>
            <form autoComplete="off" noValidate onSubmit={handleRegister}>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <FormControl sx={{ mr: 1 }} fullWidth>
                        <TextField
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            label="Enter First Name"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ ml: 1 }} fullWidth>
                        <TextField
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            label="Enter Last Name"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                </Box>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Enter Email Address"
                        variant="outlined"
                        color="primary"
                        type="email"
                        required
                    />
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Enter Password"
                        variant="outlined"
                        color="primary"
                        type="password"
                        required
                    />
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        label="Enter Address Line 1"
                        variant="outlined"
                        color="primary"
                        type="text"
                        required
                    />
                </FormControl>
                <FormControl sx={{ mt: 1 }} fullWidth>
                    <TextField
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        label="Enter City"
                        variant="outlined"
                        color="primary"
                        type="text"
                        required
                    />
                </FormControl>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <FormControl sx={{ mr: 1 }} fullWidth>
                        <TextField
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            label="Enter Province"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                    <FormControl sx={{ ml: 1 }} fullWidth>
                        <TextField
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            label="Enter Postal Code"
                            variant="outlined"
                            color="primary"
                            type="text"
                            required
                        />
                    </FormControl>
                </Box>
                <FormControl sx={{ mt: 1 }} fullWidth>
                <InputLabel>Select Type</InputLabel>
                    <Select
                        value={role}
                        label="SelectRole"
                        required
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value={'patient'}>Patient</MenuItem>
                        <MenuItem value={'nurse'}>Nurse</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <div style={{display: 'flex', justifyContent:'space-around', width:'100%'}}>
                    <Button
                        variant='outlined'
                        type='button'
                        onClick={() => navigate(-1)}
                    > Cancel
                    </Button>
                    <Button
                        type='submit'
                        color="primary"
                        variant="contained"
                    > Register </Button>
                    </div>
                </form>
            </Box>
        </Container>
    );
};

export default Register