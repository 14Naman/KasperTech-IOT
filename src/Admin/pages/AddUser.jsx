import React from "react";
import { TextField, Button } from "@mui/material";
import '../../Form.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
const AddUser = () => {
    const [email,setemmail]=useState("");
    const [password,setpassword]=useState("");
    const [erros,seterros]=useState("");
    const [success,setsuccess]=useState("");
    const handleemail=(e)=>{
        setemmail(e.target.value);
    }
    const handlepassword=(e)=>{
        setpassword(e.target.value);
    }
    const handlenewuser=async(e)=>{
      e.preventDefault();
        if(email==""||password==""){
            seterros("Email and Password cannot be empty");
            setTimeout(() => {
                seterros("");
            }, 2000);
            return;
        }
        const user= {
          email:email,
          password:password
        };
        const response=await fetch("http://localhost:8000/admin/new-user",{
          method:"POST",
            headers:{
                Accept:"application/json",
                "content-type":"application/json"
            },
            body:JSON.stringify(user)
        });
        const resp= await response.json();
        if(response.status==200){
            setsuccess("User Created Successfully");
            setTimeout(() => {
                setsuccess("");
            }, 2000);
        }
        else{
            seterros("Some error Occured");
            setTimeout(() => {
                seterros("");
            }, 2000);
        }
    }
  return (
    <form onSubmit={handlenewuser}>
        <div><p style={{color:"red"}}>{erros}</p></div>
        <div><p style={{color:"green"}}>{success}</p></div>
      <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handleemail}
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
        Create User
      </Button>
    </div>
    </form>
  )
}

export default AddUser