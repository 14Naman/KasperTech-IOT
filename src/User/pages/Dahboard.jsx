import React, { useEffect, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import classes from "../../Admin/pages/Users.module.css";
const Dahboard = () => {
    const [rooms,setrooms]=useState([]);
    const [roomname,setroomname]=useState();
    const [isLoading, setisloading] = useState(true);
    const [userid,setuserid]=useState();
    const [errors,seterrors]=useState("");
    const [deviceid,setdeviceid]=useState();
    const [statechange,setstatechange]=useState(true);
    const [roomid,setroomid]=useState();
    const [createroompopup,setcreateroompopup]=useState(false);
    const [allocatepopup,setallocatepopup]=useState(false);
    const id= localStorage.getItem("userid");
    const handleuserid=(e)=>{
        setuserid(e.target.value);
    }
    const  handleroomname=(e)=>{
        setroomname(e.target.value);
    }
    const changecreateroompopup=()=>{
        setcreateroompopup(!createroompopup);
    }
    const changeallocatepopup=(roomid)=>{
        setroomid(roomid);
        setallocatepopup(!allocatepopup);
    }
    const handledeviceid=(e)=>{
        setdeviceid(e.target.value);
    }
    async function fetchdata(){
        const response= await fetch(`http://localhost:8000/user/rooms?userid=${id}`,{
            headers:{
                Accept:"application/json",
                "content-type":"application/json",
            }
        });
        const resp=await response.json();
        console.log(resp);
        setrooms(resp.rooms);
        setisloading(false);
    }
    useEffect(()=>{
        console.log(id);
        fetchdata();
    },[statechange])
    async function handlenewroom(){
        const data={
            userid:id,
            name:roomname
        };
        const response= await fetch("http://localhost:8000/user/new-room",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "content-type":"application/json",
            },
            body:JSON.stringify(data)
        });
        const resp=await response.json();
        if(response.status==200){
            changecreateroompopup();
        }
    }
    const handleallocate=async()=>{
        const data={
            roomid:roomid,
            deviceid:deviceid
        };
        const response= await fetch("http://localhost:8000/user/allot-device",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "content-type":"application/json",
            },
            body:JSON.stringify(data)
        });
        const resp=await response.json();
        if(response.status==200){
            changeallocatepopup();
        }
        else{
            seterrors(resp.message);
        }
    }
    const changestate=async(light,fan,misc,deviceid)=>{
        const data={
            deviceid:deviceid,
            state:{
            light:light,
            fan:fan,
            misc:misc
            }
        };
        const response= await fetch("http://localhost:8000/user/change-state",{
            method:"POST",
            headers:{
                Accept:"application/json",
                "content-type":"application/json",
            },
            body:JSON.stringify(data)
        });
        const resp=await response.json();
        if(response.status==200){
            setstatechange(!statechange);
        }
    }
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
    <button style={{padding: "12px",backgroundColor: "cadetblue",color: "white",borderRadius: "13px",fontSize: "large",cursor:"pointer"}} onClick={changecreateroompopup}>Create Room</button>
    {createroompopup==true?<div class={classes.popupcontainer} id="popup">
    <div class={classes.popupform}>
        <h2 style={{textAlign:"center"}}>Create a new Room</h2>
        <button onClick={changecreateroompopup} style={{position:"absolute",top:"1px",right:"0px",backgroundColor:"transparent",border:"none",cursor:"pointer"}}>X</button>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" id="name" name="name" required placeholder='Enter Name' style={{backgroundColor:"transparent"}} onChange={handleroomname}/>
            <input type="text" id="name" name="name" required placeholder='Enter Your User Id' style={{backgroundColor:"transparent"}} onChange={handleuserid}/>
            <button type="submit" style={{backgroundColor:"red",width:"50%",margin:"auto",borderRadius:"20px",lineHeight:"2",fontSize:"large",cursor:"pointer"}} onClick={handlenewroom}>Allocate</button>
        </form>
        
    </div>
</div>:<></>}
    <div style={{display:"flex",flexWrap:"wrap",marginTop:"2%"}}>
        {rooms.map((room)=>{
            return <div  style={{width:"33%",border: "1px solid black",padding: "10px",borderRadius: "10px",margin:"10px"}}>
                <h3>{room.name}</h3>
                {room.deviceid==null?<button style={{backgroundColor: "cornflowerblue",borderRadius:"4px",cursor:"pointer"}} onClick={(roomid)=>changeallocatepopup(room.roomid)} disabled={room.deviceid!=null}>Allocate Device</button>:<div style={{display:"flex",justifyContent:"space-between"}}>
                    <button onClick={()=>changestate(room.deviceid.state.light,1-room.deviceid.state.fan,room.deviceid.state.misc,room.deviceid.deviceid)} style={{width:"33%",borderRadius:"5px",cursor:"pointer",backgroundColor:room.deviceid.state.fan==1?"green":"red"}}>Fan {room.deviceid.state.fan==1?"ON":"OFF"}</button>
                    <button onClick={()=>changestate(1-room.deviceid.state.light,room.deviceid.state.fan,room.deviceid.state.misc,room.deviceid.deviceid)} style={{width:"33%",borderRadius:"5px",cursor:"pointer",backgroundColor:room.deviceid.state.light==1?"green":"red"}}>Light {room.deviceid.state.light==1?"ON":"OFF"}</button>
                    <button onClick={()=>changestate(room.deviceid.state.light,room.deviceid.state.fan,1-room.deviceid.state.misc,room.deviceid.deviceid)} style={{width:"33%",borderRadius:"5px",cursor:"pointer",backgroundColor:room.deviceid.state.misc==1?"green":"red"}}>Misc {room.deviceid.state.misc==1?"ON":"OFF"}</button>
                </div>}
            </div>
        })}
    </div>
    {allocatepopup==true?<div class={classes.popupcontainer} id="popup">
    <div class={classes.popupform}>
        <p style={{color:"red"}}>{errors}</p>
        <h2 style={{textAlign:"center"}}>Allocate Device to Room</h2>
        <button onClick={changeallocatepopup} style={{position:"absolute",top:"1px",right:"0px",backgroundColor:"transparent",border:"none",cursor:"pointer"}}>X</button>
        <form onSubmit={(e)=>e.preventDefault()}>
            <input type="text" id="name" name="name" required placeholder='Enter Device Id' style={{backgroundColor:"transparent"}} onChange={handledeviceid}/>
            <button type="submit" style={{backgroundColor:"red",width:"50%",margin:"auto",borderRadius:"20px",lineHeight:"2",fontSize:"large",cursor:"pointer"}} onClick={handleallocate}>Allocate</button>
        </form>
    </div>
</div>:<></>}
    </>
  )
}

export default Dahboard