import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { useState,useEffect } from 'react'
const AddDevice = () => {
    const [devices,setdevice]=useState([]);
    const [isLoading, setisloading] = useState(true);
    const addnewdevice=async()=>{
        const response= await fetch("http://localhost:8000/admin/add-device",{
            method:"POST",
                headers:{
                    Accept:"application/json",
                    "content-type":"application/json",
                }
            });
            const resp=await response.json();
            fetchdata();
    }
    async function fetchdata(){
        const response= await fetch("http://localhost:8000/admin/devices",{
            headers:{
                Accept:"application/json",
                "content-type":"application/json",
            }
        });
        const resp=await response.json();
        console.log(resp.devices);
        setdevice(resp.devices);
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
    <div><button onClick={addnewdevice} style={{padding: "12px",backgroundColor: "cadetblue",color: "white",borderRadius: "13px",fontSize: "large"}}>AddDevice</button></div>
    <div style={{margin:"2% 0px"}}>
    {devices.map((device)=>{
        return <div style={{width:"80%",margin:"5px auto",display:"flex",justifyContent:"space-between",border: "1px solid black",padding: "1px 10px",borderRadius: "5px"}}>
            <h3>Device ID:{device.deviceid}</h3>
            <p style={{ color: device.allotedto === null ? "red" : "green" }}>Status: {device.allotedto==null?"Unallocated":device.allotedto.userid}</p>
        </div>
    })};
    </div>
    </>
  )
}

export default AddDevice