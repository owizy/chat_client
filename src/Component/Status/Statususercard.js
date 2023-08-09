import React, { useContext, useEffect } from 'react'
import "./Statususercard.css"
import axios from 'axios'
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
  console.log('img',images)
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userId", user._id);  
      formData.append("picture", image, image);


      let res = await axios.post("http://localhost:8000/api/upload", formData);
      setError(false);
      handleClose();
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };
//  useEffect(()=>{
//   getImage()
//  },[])
//   const getImage = async () => {
//     try {
//       let { data } = await axios.get("http://localhost:8000/api/images");
//       setImages(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
    return (
    <div className='statuscont' onClick={()=>navigate('/status/:userid')}>
         <div >
            <Avatar src={user?.fullname}/>
        </div>
        <div>
           <p>{user?.fullname}</p> 
        </div> 
        
        
        
         {/* { images
        ? images.map((Images) => {
            return (
              <>
              
              
              <img
                  className=" w-100 img-fluid"
                  src={Images.Images}
                  alt="carousel"
                />
              
                  <h3>{Images.userId}</h3>
 
              </>             
            );
          })
        : null}
 */}








    </div>
  )
}

export default Statususercard