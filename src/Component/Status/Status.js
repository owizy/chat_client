import React from 'react'
import "./Stautus.css"
import Statususercard from './Statususercard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
function Status() {
  const navigate =useNavigate();
  const handlenavigate=()=>{
    navigate(-1)
  }
  return (
    <div className='status'>
      <div className='status2'>
        <div className='lefts'>
          <div className='statcardcontainer'>
            <Statususercard/>  
          </div>
          <hr/>
          <div style={{overflowY:"scroll",
        height:"86%"}}>
            {[1,].map((item)=><Statususercard/>)}
          </div>
        </div>

        <div className='rights'>
            <AiOutlineClose style={{position:"absolute",
          top:5,
          right:5,
          color:"#fff",
          cursor:"pointer"
          }}
          onClick={handlenavigate}/>
        </div>

      </div>
    </div>
  )
}

export default Status