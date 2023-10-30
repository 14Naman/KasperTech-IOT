import React from 'react';
import { useEffect,useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
const Devices = () => {
    const [devices,setdevices]=useState([]);
    const [isLoading, setisloading] = useState(true);
    const id= localStorage.getItem("userid");
    async function fetchdata(){
        const response= await fetch(`http://localhost:8000/user/devices?userid=${id}`,{
            headers:{
                Accept:"application/json",
                "content-type":"application/json",
            }
        });
        const resp=await response.json();
        setdevices(resp.devices);
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
    <div style={{display:"flex",flexDirection:"column"}}>
        {devices.length>0&&devices.map((device)=>{
            return <div style={{display:"flex",justifyContent:"space-between",lineHeight: "0.5",border: "1px solid",padding: "10px",borderRadius: "10px",margin: "5px"}}>
            <h3>Device Id:{device.deviceid}</h3>
            <p style={{ color: device.roomid === null ? "red" : "green" }}>Alloted to: {device.roomid==null?"Unallocated":device.roomid.name}</p>
        </div>
        })}
    </div>
  )
}

export default Devices