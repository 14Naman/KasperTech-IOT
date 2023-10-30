import React from 'react'

const User = (props) => {
  return (
    <>
    <div style={{display:"flex",justifyContent:"space-between",lineHeight: "0.5",border: "1px solid",padding: "10px",borderRadius: "10px",margin: "5px"}}>
        <h3>{props.user.userid}</h3>
        <button style={{padding: "12px",backgroundColor: "cornflowerblue",color: "white",borderRadius: "13px",fontSize: "large",cursor:"pointer"}} onClick={(e)=>props.changeallocate(e,props.user._id)}>Allocate New Device</button>
        <button style={{padding: "12px",backgroundColor: "cornflowerblue",color: "white",borderRadius: "13px",fontSize: "large",cursor:"pointer"}} onClick={(e)=>props.changeallocatedpopup(e,props.user.devices)}>See Allocated Devices</button>
    </div>
    </>
  )
}

export default User