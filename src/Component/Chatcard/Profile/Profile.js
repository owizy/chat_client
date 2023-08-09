import React, { useContext, useEffect, useState } from 'react'
import { BsArrowLeft, BsCheck, BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import "./Profile.css"
import { ThemeContext } from '../../../context/Themecontext'
import { AuthContext } from '../../../context/AuthContext'
import { Avatar } from '@mui/material'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import axios from 'axios'
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',  
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


function Profile({handlecloseopenprofil}) {
   const navigate =useNavigate()
   const {theme} = useContext(ThemeContext)
   const {user}=useContext(AuthContext)
   const[flags,setflags]=useState(false)
   function handleflag(){
    setflags(true)
   }
   function handlecheckclick(){
    setflags(false)
   }
   const[username,setusername]=useState("")
  function  handlechange(e){
    setusername(e.target.value)
  }



  return (
    <div className='profiles' style={{ backgroundColor:theme !== "light-theme" ? "#F5F6F6":"#111B21" ,color: theme !== "light-theme"  ? "black !important" :"white !important"}}>
        <div className='usernamesprofs' style={{backgroundColor:theme !== "light-theme"?"#008069" :"#222E35"}}>
        <BsArrowLeft style={{cursor:"pointer"}} onClick={handlecloseopenprofil} />
        <p style={{cursor:"pointer",fontStyle:"400"}}>Profile</p>
        </div>
       <div className='ims'>
       
        <label htmlFor="file" className="files" >    
        <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant=""
              >
                <Avatar alt={user?.fullname} src="/static/images/avatar/1.jpg"  style={{width:"25vh",height:"25vh", fontSize:"50px"}}/>
              </StyledBadge>                
      
              
              
                                      
              
          
        
           
          </label>
          
       </div>
     <div style={{backgroundColor:theme !== "light-theme" ? "white":"#111B21" ,padding:"20px",display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:'flex-start',marginTop:"50px",gap:"20px",color: theme !== "light-theme" ? "black" : "white"}} className='flags'>
     <label className='users'>Your Name</label>
     
      {
        !flags &&
        <div className='edits'>
      <p>{ username||user.fullname}</p> 
      <BsPencil style={{cursor:"pointer"}} onClick={handleflag}/>
      </div>
      }
      {
        flags && <div style={{backgroundColor:theme !== "light-theme" ? "white":"#111B21",padding:"10px",display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:'center',marginTop:"0px",gap:"10px", color: theme !== "light-theme" ? "black" : "white" }} >

            <input type='text' placeholder='enter your name' style={{border:"none",outline:"none",
            padding:"5px",
          width:320,
         borderBottom:"1px solid lightblue",
         backgroundColor:theme !== "light-theme" ? "white" : "#111B21",
         color:theme !== "light-theme" ? "black" : "white"
        }} onChange={handlechange} />
        <BsCheck style={{cursor:"pointer"}}
        onClick={handlecheckclick}
        />
        </div>
      }
      </div>
      <div className='decv-cont'>
        <p className='decv'>This is not your username or pin . this name <br/> will be visible to your WhatsApp contact</p>
      </div>
      <div className='ed' style={{backgroundColor:theme !== "light-theme" ? "white":"#111B21",color:theme !== "light-theme" ? "black" : "white"}}>
        <p>Abouts</p>
        </div> 
    </div>
  )
}

export default Profile