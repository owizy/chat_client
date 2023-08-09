import React, { useEffect, useState } from 'react'
import "./statusview.css"
import { stories } from './Story'
import {BsArrowLeft} from "react-icons/bs"
import Progressbar from './Progressbar'
import {AiOutlineClose} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
function Statusview() {
const navigate=useNavigate()
  const[currentStoryIndex,setcurrentStoryIndex]=useState(0)
  const[activeindex,setactiveindex]=useState(0)
  const handlenextstories=()=>{
    if(currentStoryIndex < stories?.length-1){
        setcurrentStoryIndex(currentStoryIndex +1)
        setactiveindex(activeindex +1)
    }else{
        setactiveindex(0)
        setcurrentStoryIndex(0)
    }
  }
  useEffect(()=>{
    const intervalid=setInterval(() => {
        handlenextstories();
    },2000);
    return()=>clearInterval(intervalid)
  },[currentStoryIndex])
  const handlenavigate=()=>{
    navigate(-1)
  }  
  
  
  return (
    <div className='viewscont' style={{position:"relative"}}>
        <div className='sviews'>
            <img src={stories?.[currentStoryIndex].image}
            className='views'/>
            <div style={{position:"absolute",top:"0",
        display:"flex",
        gap:"20px",
        width:"100%"
        }} className='storiesbody'>
                 {
                    stories.map((items,index)=><Progressbar key={index}  durations={2000}  index={index}
                    activeindexs={activeindex}/>)
                 }   
            </div>
        </div>
        <div>
            <BsArrowLeft  style={{color:"#fff",
          position:"absolute",
          top:"0",
          left:"10",
        fontSize:"30px",cursor:"pointer"}}
          onClick={handlenavigate}/>
          <AiOutlineClose style={{color:"#fff",
        position:"absolute",
        top:"0",
        right:"10",
      fontSize:"30px",cursor:"pointer"}}
        onClick={handlenavigate}
        />
        </div>
    </div>
  )
}

export default Statusview