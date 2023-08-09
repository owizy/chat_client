import React, { useEffect, useState } from 'react'
import "./Progressbar.css"
function Progressbar({index,activeindexs,durations}) {
 const isActive=index===activeindexs;
 const[progress,setprogress]=useState();
 useEffect(()=>{
    const intervalid=setInterval(() => {
        setprogress((prev)=>{
          if(prev < 100){
            return prev +1
          }
          clearInterval(intervalid)
          return prev
        })
    }, durations/100);
 },[activeindexs,durations])
 useEffect(()=>{
    setprogress(0)
 },[activeindexs])
 
 return (
    <div className={`progressbarcont ${isActive?"active":"" }`}>
       <div className={`${isActive ?"progressbar":"" }`} style={{width:`${progress}%`}}>

       </div>
    </div>
  )
}

export default Progressbar