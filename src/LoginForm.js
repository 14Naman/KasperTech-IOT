import React from "react";
import { TextField, Button } from "@mui/material";
import './Form.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Slider,
  Rating,
} from "@mui/material";
// require('dotenv').config();
const LoginForm = (props) => {
  const [formType, setFormType] = useState("User");
  const [email,setemail]= useState("");
  const [password,setpassword]= useState("");
  const [err,seterr]= useState("");
  const errormsg= useRef("");
  const navigate= useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    props.onSubmit();
  };
  if(props.admin){
    setFormType("Admin");
  }
  const handelemail= (e)=>{
    setemail(e.target.value);
  }
  const handlepassword= (e)=>{
    setpassword(e.target.value);
  }
  const [searchParams, setSearchParams] = useSearchParams();
      const error= searchParams.get("error");
      if(error){
        errormsg.current= "*User Not Found!! Please Register";
      }
  
  const handleformlogin= async(e)=>{
    e.preventDefault();
    console.log("Form Login");
    const user= {
      userid:email,
      password:password
    };
    const response = await fetch("http://localhost:8000/user/login",{
      credentials: 'include',
      mode: 'cors',    
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body:JSON.stringify(user),
          
        });
        console.log(response);
        const resp= await response.json();
        console.log(resp);
        if(response.status===401||response.status===500){
          seterr(resp.message);
          return;
        }
        localStorage.setItem("userid",email);
        return window.open("http://localhost:3000/","_self");
  };
  
  const handleadminlogin= async(e)=>{
    e.preventDefault();
    // console.log(formType);
    const user= {
      adminId:email,
      password:password
    };
    const response = await fetch("http://localhost:8000/admin/login",{
      credentials: 'include',
      mode: 'cors',    
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body:JSON.stringify(user),
          
        });
        console.log(response);
        const resp= await response.json();
        console.log(resp);
        if(response.status===401||response.status===500){
          seterr(resp.message);
          return;
        }
        return window.open("http://localhost:3000/admin","_self");
  };
  return (
    <div className="form-container">
      <p className='warning'>{err}</p>
      <p className='warning'>{errormsg.current}</p>
      <div>
      <Slider
        aria-label="Form Type"
        value={formType === "User" ? 0 : 1}
        onChange={(event, newValue) =>
          setFormType(newValue === 0 ? "User" : "Admin")
        }
        min={0}
        max={1}
        step={1}
        marks={[
          { value: 0, label: "User" },
          { value: 1, label: "Admin" },
        ]}
      />
      </div>
    <form onSubmit={formType==="User"? handleformlogin:handleadminlogin}>
    {formType === "User" ? (
      <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="User Id"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handelemail}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handlepassword}
      />
      <Button type="submit" fullWidth variant="contained" id="btn">
        Sign In
      </Button>
    </div>):(
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="admin"
        label="Admin ID"
        name="adminid"
        // autoComplete="email"
        autoFocus
        onChange={handelemail}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handlepassword}
      />
      <Button type="submit" fullWidth variant="contained" id="btn">
        Sign In
      </Button>
    </div>)}
    </form>
    {/* <a href="http://localhost:3000/register"  style={{float: "left",textDecoration:"underline"}}>Don't have an account?</a> */}
    </div>
  );
};

export default LoginForm;
