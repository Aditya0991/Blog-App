import React,{useState} from 'react'
import { Box, Typography, TextField, Button } from "@mui/material";
import { authAction } from "../redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input,setInput] = useState({email : "", password: ""})

  const handleChange =(e)=>{
    const {name,value} = e.target;
    setInput((prevState)=>({
      ...prevState, [name]:value
    }))
  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    try{
      console.log(input)
      const {data} = await axios.post("http://localhost:8000/api/user/login",input)
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authAction.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    }
    catch(error){
        console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
          <Box maxWidth={450} display="flex" flexDirection={"column"} alignItems="center" justifyContent={"center"} margin="auto" marginTop={5} boxShadow="10px 10px 20px #ccc" padding={3} borderRadius={5}>
            <Typography variant='h4'  sx={{ textTransform: "uppercase" }} padding={3} textAlign="center">Login</Typography>
            <TextField placeholder='email' value={input.email} name='email' onChange={handleChange} type={"email"} margin='normal' required/>
            <TextField placeholder='password' value={input.password} name='password' onChange={handleChange}  type={"password"} margin='normal' required/>
            <Button type='submit' color='primary' sx={{ borderRadius: 3, marginTop: 3 }} variant="contained">Submit</Button>
          </Box>
      </form>
    </>
  )
}

export default Login
