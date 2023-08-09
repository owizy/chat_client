import React, { useContext,useState,useEffect } from 'react'
import "../Component/Chatcard/Chatcards.css"
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import { ThemeContext } from '../context/Themecontext';
import { BsArrowLeft } from 'react-icons/bs'
import { AuthContext } from '../context/AuthContext';
import ".././Component/Homepage.css"
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

function Users({setSeechat,handlechange}) {
    const {theme} = useContext(ThemeContext)
    const[users , setUser] = useState([]);
    const {user,setMessages,messages} =useContext(AuthContext)
	useEffect(() => {
		 const fetchUsers = async () => {
			const res = await fetch(`https://chat-server-2ykq.onrender.com/api/user/find/${user?._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const resData = await res.json()
               
        setUser(resData)                       
		} 
   fetchUsers()
	}, [user])





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
  return (
      <section className='UserContainers'>
        <div className='usernamesprofs' style={{backgroundColor:theme === "dark-theme"?"#008069" :"#222E35"}}>
        <BsArrowLeft style={{cursor:"pointer"}} onClick={()=>setSeechat(false)}   className='arrows'/>
        <p style={{cursor:"pointer",fontStyle:"400"}}>New Chat</p>
        </div> 
           
        <div className='searchs' style={{ backgroundColor:theme !== "light-theme" ? '#fff': "#111B21",borderBottom: theme !== "light-theme" ? "1px solid gray":"2px solid #1a1d21" }}>
                  
                     <div>  
                </div> 
                </div>            
          <div className='chatsscont'>
          <div className='Chatconts' style={{backgroundColor: theme === "dark-theme" ? "#F5F6F6": "#111B21" }}>
            { users.length > 0 ? users.map((({user})=>{
              return(
                

<div className='leftchat' onClick={()=>{ return fetchMessages('new',user) , handlechange(true)} } >
        <StyledBadge
                  overlap="circular"
          >
            <Avatar alt={user.fullname} src="/" />
          </StyledBadge>    
          <div className='sec'>
           <p>{user.fullname}</p>  
        </div>
                
        <Divider/>      
        
            </div>
     
              )
            } ))
             : <div><p>No user Found</p> </div>}


   </div>
   
          </div>
   
      </section>
  )
}

export default Users
