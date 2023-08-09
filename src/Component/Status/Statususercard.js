import React, { useContext, useEffect } from 'react'
import "./Statususercard.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Avatar } from '@mui/material'
function Statususercard() {
   const navigate =useNavigate()
   const handlenavigate=()=>{
    navigate(`/status/{userid}`)
   }
   const [show, setShow] = useState(false);

   const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const {user} = useContext(AuthContext)
   
  const [images, setImages] = useState([]);
    return (
    <div className='statuscont' onClick={()=>navigate('/status/:userid')}>
         <div >
            <Avatar src={user?.fullname}/>
        </div>
        <div>
           <p>{user?.fullname}</p> 
        </div> 
    </div>
  )
}

export default Statususercard
