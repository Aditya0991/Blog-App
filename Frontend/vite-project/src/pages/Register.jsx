import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInputs] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;  
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(input)
      const { data } = await axios.post('http://localhost:8000/api/user/register', input);
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error('Error registering user:', error); // Handle error, e.g., show error message
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={450} display="flex" flexDirection="column" alignItems="center" justifyContent="center" margin="auto"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" sx={{ textTransform: 'uppercase' }} padding={3} textAlign="center">
            Register
          </Typography>
          <TextField
            placeholder="name.username"
            value={input.name}
            onChange={handleChange}
            name="username"
            margin="normal"
            type="text"
            required
          />
          <TextField
            placeholder="email"
            value={input.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type="email"
            required
          />
          <TextField placeholder="password" value={input.password} onChange={handleChange} name="password" margin="normal" type="password" required/>
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
