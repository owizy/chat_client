import React, { useContext } from 'react'
import "./Chatcards.css"
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { ThemeContext } from '../../context/Themecontext';
import { AuthContext } from '../../context/AuthContext';
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
  
function Chatcards({user, show}) {
    const {theme} = useContext(ThemeContext)
    const{setMessages} =useContext(AuthContext)
   
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
   <section className='Chatcont' style={{backgroundColor: theme === "dark-theme" ? "#F5F6F6": "#222E35" }}  onClick={()=>{ return fetchMessages('new',user) , show(true)}}>
            <div className='leftchat'>
            <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant=""
      >
        <Avatar alt={user.fullname} src="/static/images/avatar/1.jpg" />
      </StyledBadge>    
      <div className='sec'>
       <p>{user.fullname}</p> 
    </div>        
        </div>


<Divider/>
   </section>
  )
}

export default Chatcards