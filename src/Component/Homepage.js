import React, { useContext, useState,useEffect, useRef } from 'react'
import "./Homepage.css"

import {AiOutlineSearch} from "react-icons/ai"
import { BsArrowBarLeft, BsArrowLeft, BsFilter} from "react-icons/bs"
import Chatcards from './Chatcard/Chatcards'
import rightimg from "./Screenshot (80).png"
import lock from "./icons8_lock_96px_5.png"
import {BsThreeDotsVertical}  from "react-icons/bs"
import Messsage from './Chatcard/messagecard/messsage'
import { useNavigate } from 'react-router-dom'
import Profile from './Chatcard/Profile/Profile'
import InputEmoji from "react-input-emoji"
import communties from "../utils/icons8_staff_96px_5.png"
import status from "../utils/icons8_inactive_state_96px.png"
import chat from "../utils/icons8_sms_96px.png"
import menus from "../utils/icons8_menu_vertical_96px.png"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { ThemeContext } from '../context/Themecontext'
import darkimg from "./Screenshot (115).png"
import { AuthContext } from '../context/AuthContext'
import Users from '../pages/Users';
import { io } from 'socket.io-client'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import chatlight from '.././Component/chatlight.png'
import chatdark from '.././Component/chatdark.png'
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

function Homepage() {
   const[Querys,setQuerys]=useState("");
  const [currentchat,setcurrentchat]=useState(false )
  const handleclickchatcard=()=>{
    setcurrentchat(false)
}
const {theme} = useContext(ThemeContext)
  const {user,logoutUser,Alluser,SetAlluser,messages,setMessages,setActiveuser} = useContext(AuthContext)
	const messageRef = useRef(null)
const navigate=useNavigate()
const[isprofile,setisprofile]=useState(false)
const [content,setcontent]=useState("")
const[seeusers,setSeeUsers]= useState(false)
const[conversation,SetConversation]= useState([])
const[check,setCheck]=useState(false)
   const handlenavigate=()=>{
    // navigate("/profile")
    setisprofile(true);
   }
   function handlecloseopenprofil(){
    setisprofile(false)
   } 


   const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  

   useEffect(() => {
    const fetchUsers = async () => {
     const res = await fetch(`https://chat-server-2ykq.onrender.com/api/user/find/${user?._id}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       }
     });
     const resData = await res.json()
     SetAlluser(resData)                               
   } 
   fetchUsers()
 }, [])

 const fetchMessages = async (conversationId, receiver) => {
  const res = await fetch(`https://chat-server-2ykq.onrender.com/api/messsage/${conversationId}?senderId=${user?._id}&&receiverId=${receiver?.receiverId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const resData = await res.json()
  setMessages({ messages: resData, receiver, conversationId })
}


useEffect(()=>{
  const fetchConversation = async()=>{
       const res = await fetch(` https://chat-server-2ykq.onrender.com/api/conversations/${user?._id}`, {
        method:"GET",
        headers:{
          'Content-Type':'application/json',
        }
       })
       const resData = await res.json()
       SetConversation(resData)

  }
  fetchConversation()
},[])

const socket =  io('https://chat-server-2ykq.onrender.com')


useEffect(() => {
  socket.emit('addUser', user?._id);
  socket.on('getUsers', (users) => {
    // console.log('activeUsers :>> ', users);
  })
  socket?.on('getMessage', data => {
    // console.log('data',data)
    // setMessages(...messages , {data}  )
  	setMessages(prev => ({
      ...prev,
      messages: [...prev.messages, { user: data.user, message: data.message }]
    }))

      

  })
 
}, [socket,user])

useEffect(() => {
  messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages?.messages])
const sendMessage = async (e) => {
  
  socket.emit('sendMessage', {
    senderId: user?._id,
    message:content,
    conversationId: messages?.conversationId,
    receiverId: messages?.receiver?.receiverId,
   
  
  });
  const res= await fetch(`https://chat-server-2ykq.onrender.com/api/messsage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      senderId: user?._id,
      message:content,
      conversationId: messages?.conversationId,
      receiverId: messages?.receiver?.receiverId
        })
  });
   setcontent('')
 
}




return (
    <div className='homepage-cont'  style={{backgroundColor:theme !== "light-theme"?"#fof2f5" :"#202C33"}}>
        <div className='homepage'  style={{backgroundColor:theme !== "light-theme"?"#00A884" :"#202C33"}}>
              
        <div className='cont' style={{backgroundColor:theme !== "light-theme"?"#f0f2f5" :"#202C33"}}>
        
        
        <div className='profilesCont'>
        {isprofile && <Profile handlecloseopenprofil={handlecloseopenprofil}/>} 
            </div>  
            <div className='profilesCont'>
        </div>               
        {!isprofile &&   <div className='left' style={{backgroundColor:theme !== "light-theme"?"#f0f2f5" :"#111B21"  , color: theme !== "light-theme" ? "black":"white"}} >
         
                      { !seeusers ? <>
                          
                       <div className='left-child'>
                          
                <div  className='profile'>
                      <div onClick={handlenavigate} className='photo'>
                      <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant=""
              >
                <Avatar alt={user?.fullname} src="/static/images/avatar/1.jpg" />
              </StyledBadge>    
                      </div>
                    <div className='icons'>
                    <img  src={communties} width={35}/>
                     <img  src={status}  width={25} height={25}/>           
                      <img  src={chat} width={25} height={25} onClick={()=>setSeeUsers(true)}/>
                      <img  src={menus}  width={25} height={25} onClick={handleClick}/>
                      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            padding:1,
            bgcolor:theme !== "light-theme" ? 'background.paper': "#111B21",
            color: theme !== "light-theme" ? 'black' :"white",
            '& .MuiAvatar-root':{
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor:theme !== "light-theme" ? 'background.paper': "#111B21",
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={()=> setisprofile(true)}>
          <Avatar /> Profile
        </MenuItem>
            <Divider />
        <MenuItem onClick={handleClose}>
         New group
        </MenuItem>
        <MenuItem onClick={handleClose}>
         New community
        </MenuItem>
        <MenuItem onClick={handleClose}>
         Starred messages
        </MenuItem>
        <MenuItem onClick={()=>navigate('/sets')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={()=>logoutUser()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

           
                    </div>
                       
                    </div>
                </div>  
           
                      
                <div className='searchs' style={{ backgroundColor:theme !== "light-theme" ? '#fff': "#111B21",borderBottom: theme !== "light-theme" ? "1px solid gray":"2px solid #1a1d21" }}>
                  <div className='input-cont' style={{ backgroundColor:theme !== "light-theme" ? '#F0F2F5': "#202C33",}}>
                  <AiOutlineSearch/> 
                  <input type='text' placeholder='search or start new chat' onChange={(e)=>{
                    setQuerys(e.target.value)
                
                    
                  }} value={Querys} style={{ backgroundColor:theme !== "light-theme" ? '#F0F2F5 !important': "#202C33", color:theme !== "light-theme" ? 'black': "white",}}/> 
                
                    </div>
                     <div>
                <BsFilter/>        
                </div> 
                </div>
                <div className='cardbody'  style={{ backgroundColor:theme !== "light-theme" ? '#F5F6F6': "#202C33", color : theme === "dark-theme" ? "#000": "#fff"}}>
                    {
                    
                    
                    Querys !== "" ?
                    <>
                  
                     {
                   
                     Alluser.map((({user})=>{
                      if(user.fullname.includes(Querys.trim()) ){ return (
                        <Chatcards user={user}    show={setcurrentchat} key={user?._id} />
                      )
                  
                      }
                      }))}
                    </> 
                    : <>
                    
                    {
							conversation.length > 0 ?
								conversation.map(({ conversationId, user }) => {
                  
									return (
                    <section className='Chatcont' style={{backgroundColor: theme === "dark-theme" ? "#F5F6F6": "#222E35" }} onClick={()=>{ return fetchMessages(conversationId , user), setcurrentchat(true)} } >
                    <div className='leftchat'>
                    <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant={check ? "dot" : ""}
              >
                <Avatar alt={user?.fullname} src="/static/images/avatar/1.jpg" />
              </StyledBadge>    
              <div className='sec'>
               <p>{user.fullname}</p> 
            </div>        
                </div>
        
           <div className='rightchat'>
            {/* <div> 1:30am</div>
            <div className='unread'>5</div> */}
           </div>
        
        <Divider/>
           </section>
									)
								}) : <div className='text-center text-lg font-semibold mt-24'  style={{width:"100%",
                display:"flex",
              justifyContent:"center",
            alignItems:"center",
          fontFamily:"sans-serif",
        fontWeight:"lighter" }}>No Conversations</div>
						}
                      
                    </>
                    
                    
                    }
                 <div>
                    
                </div>   
                </div> 
                       
                      
                      </> : <Users setSeechat={setSeeUsers} handlechange={setcurrentchat}/>}
                
            </div>}

            
          

           {
            currentchat ?
            <>
            
            {
                 
                 messages?.receiver?.fullname &&  <div className='h-cont'>
                 <div className='head-cont'  style={{backgroundColor: theme ===  'dark-theme' ?  "#fff" :"#202C33" ,color:theme ===  'dark-theme' ?   '#000' : '#fff'}}>
                 
                 <div className='heads'>
                 <BsArrowLeft onClick={handleclickchatcard} style={{cursor:"pointer" , padding:"10px"}}/>
                 <Avatar alt={messages?.receiver?.fullname} src='/'/>
                 <p>{messages?.receiver?.fullname}</p>
                 </div>
                     <div className='sicon'>
                     <AiOutlineSearch/>   
                    <BsThreeDotsVertical/>                         
                     </div>
                 </div>
                 <div className='mcontainer'  style={{backgroundImage:theme === 'dark-theme' ? `url(${chatlight})`: `url(${chatdark})`}}>
                 <div className='mesagescont'>
                 {
							messages?.messages?.length > 0 ?
								messages.messages.map(({ message, user: { id } = {} , timestamp}) => {
									return (
										<>
										 <Messsage  isreadusermessage={id === user?._id} content={message} timestamp={timestamp}/>
										<div ref={messageRef}></div>
										</>
									)
								}) : <div className='text-center text-lg font-semibold mt-24' style={{
                  width:"100%",
                  display:"flex",
                justifyContent:"center",
              alignItems:"center",
            fontFamily:"sans-serif",
          fontWeight:"lighter" }}>Start a Conversation</div>
						}
                        
                        
                        
                    
                 </div>
                 <div  className="inputbox"style={{backgroundColor:theme === 'dark-theme' ? "#F0F2F5" :"#202C33"}}>
                 <InputEmoji  onChange={setcontent}  value={content}  placeholder='Type to message' style={{backgroundColor:theme === 'dark-theme' ? "#F0F2F5" :"#202C33"}}/>
                 {content ? <button className='send-btn' onClick={()=> sendMessage() }>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                 <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                 </svg>
                 </button> : <button className='send-btn' >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                 <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                 </svg>
                 </button>}
                 </div>
                 
                 </div>
                 </div>
                    
             }
            
            
            </>
            :<>
            <div className='right' style={{ backgroundColor:theme !== "light-theme" ? '#F0F2F5': "#202C33",}}>
                <div className='rightcont'>
                    <div>
                      {theme !=="light-theme" ?  <img src={rightimg} className='rightimg'/>: <img src={darkimg} className='rightimg' />}
                          <h1>WhatsApp web</h1> 
                          <p>Send and receive message without keeping your phone online <br/>Use WhatsApp on up to 4 linked devices and 1 phone at the same time</p>   
                    </div>
                    <div className='ends'>
                        <img src={lock} width={20}/>
                     <p> End to end encrypted</p>
                    </div>
                </div>
            </div>
            
            
            </>
           }
    </div>
        </div>
    </div>

  )
}

export default Homepage
