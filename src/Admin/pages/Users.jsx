import React from 'react'
import { useState,useEffect } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import User from './User';
import classes from "../pages/Users.module.css";
const Users = () => {
    const [users,setusers]=useState([]);
    const [isLoading, setisloading] = useState(true);
    const [allocatenewpopup,setallocatenewpopup]=useState(false);
    const [seeallocatedpopup,setseeallocatedpopup]=useState(false);
    const [allocateddevices,setallocateddevices]=useState([]);
    const [deviceid,setdeviceid]=useState("");
    const [currentuser,setcurrentuser]=useState("");
    const handledeviceid=(e)=>{
      setdeviceid(e.target.value);
    }
    const changeallocate=(e,userid)=>{
      e.preventDefault();
      setcurrentuser(userid);
      setallocatenewpopup(!allocatenewpopup);
    }
    const changeallocatedpopup=(e,devices)=>{
      e.preventDefault();
      console.log(devices);
      setallocateddevices(devices);
      setseeallocatedpopup(!seeallocatedpopup);
    }
    const handleallocate=async()=>{
      console.log(allocateddevices);
      const data={
        deviceid:deviceid,
        userid:currentuser
      }
      const response= await fetch("http://localhost:8000/admin/allot-device",{
        method:"POST",
          headers:{
              Accept:"application/json",
              "content-type":"application/json",
          },
          body:JSON.stringify(data)
      });
      const resp=await response.json();
      console.log(resp);
      if(response.status==200){
        setallocatenewpopup(!allocatenewpopup); 
      }
    }
    async function fetchdata(){
      const response= await fetch("http://localhost:8000/admin/users",{
          headers:{
              Accept:"application/json",
              "content-type":"application/json",
          }
      });
      const resp=await response.json();
      console.log(resp.users);
      setusers(resp.users);
      setisloading(false);
  }
  useEffect(()=>{
      fetchdata();
  },[])
  if (isLoading) {
    // Render a loading indicator or placeholder component
    // return <div>Loading...</div>;
    return (
      <>
        <CircularProgress color="success" />
        <span>Loading...</span>
      </>
    );
  }
  return (
    <>
    <div style={{display:"flex",flexDirection:"column"}}>
        {users.map((user)=>{
            return <User user={user} changeallocate={changeallocate} changeallocatedpopup={changeallocatedpopup}/>
        })}
    </div>
    {allocatenewpopup==true?<div class={classes.popupcontainer} id="popup">
    <div class={classes.popupform}>
        <h2 style={{textAlign:"center"}}>Allocate a new Device</h2>
        <button onClick={changeallocate} style={{position:"absolute",top:"1px",right:"0px",backgroundColor:"transparent",border:"none",cursor:"pointer"}}>X</button>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" id="name" name="name" required placeholder='Enter Device ID' style={{backgroundColor:"transparent"}} onChange={handledeviceid}/>
            <button type="submit" style={{backgroundColor:"red",width:"50%",margin:"auto",borderRadius:"20px",lineHeight:"2",fontSize:"large",cursor:"pointer"}} onClick={handleallocate}>Allocate</button>
        </form>
        
    </div>
</div>:<></>}
    {seeallocatedpopup==true?<div class={classes.popupcontainer} id="popup">
    <div class={classes.popupform}>
        <h2 style={{textAlign:"center"}}>Allocated Devices</h2>
        <button onClick={changeallocatedpopup} style={{position:"absolute",top:"1px",right:"0px",backgroundColor:"transparent",border:"none",cursor:"pointer"}}>X</button>
        {allocateddevices.map((device)=>{
          return <div style={{margin:"5px auto",display:"flex",justifyContent:"space-between",border: "1px solid black",padding: "1px 10px",borderRadius: "5px"}}>
          <h3>Device ID:{device}</h3>
          {/* <p style={{ color: "green" }}>Status: {device.allotedto==null?"Unallocated":device.allotedto}</p> */}
      </div>
        })}
    </div>
</div>:<></>}
    </>
  )
}
export default Users
