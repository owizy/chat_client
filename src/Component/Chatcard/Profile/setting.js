import React, { useContext, useState } from 'react'
import "./Profile.css"
import { Divider } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import HelpIcon from '@mui/icons-material/Help';
import Logout from '@mui/icons-material/Logout';
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import rightimg from "../../Screenshot (80).png"
import lock from "../../icons8_lock_96px_5.png"
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import darkimg from "../../Screenshot (115).png"
import { ThemeContext } from '../../../context/Themecontext';
import { AuthContext } from '../../../context/AuthContext';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  

function Setting(){
      const navigate = useNavigate()
      const {  ToggleTheme , theme } = useContext(ThemeContext)
      const {user,logoutUser} = useContext(AuthContext)
      return (
    <section className='settings'  style={{backgroundColor: theme === "dark-theme" ? "#fff" : "#111B21", color: theme === "dark-theme" ? "black" : "white"}} >
         <section className='setleft'>
         <div className='usernamesprofs' style={{backgroundColor:theme === "dark-theme"?"#008069" :"#222E35"}}>
        <BsArrowLeft style={{cursor:"pointer"}} onClick={()=>navigate('/')} className='arrows'/>
        <p style={{cursor:"pointer",fontStyle:"400"}}>Settings</p>
        </div>
        <div className='set-cont'>
            <div className={theme === "dark-theme" ?'users1':"hovers"}>
             <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant=""
              >
                <Avatar alt={user?.fullname} src="/static/images/avatar/1.jpg" />
              </StyledBadge> 
                <p>{user.fullname}</p>
            </div>
             <div className={ theme === "dark-theme" ? ' setside' : 'hovers'} >
                <NotificationsIcon sx={{color:"#54656F"}}/>
                <p>Notifications</p>
             </div>
             <Divider/>
             <div className={ theme === "dark-theme" ? ' setside' : 'hovers'}>
                <LockIcon sx={{color:"#54656F"}}/> 
                <p>Privacy</p>
             </div>
             <Divider/> 
             <div className={ theme === "dark-theme" ? 'tems' :'hov'}>
             <div>
                <Brightness6Icon sx={{color:"#54656F"}}/>  
                <p>Theme</p>
                </div>
                <div>
             <FormControlLabel
        control={<MaterialUISwitch sx={{ m: 1 }}/>}
        label={""}  onClick={()=> ToggleTheme()}/>               </div>
             </div>
             <div>

             </div>
             <Divider/>
             <div className={ theme === "dark-theme" ? ' setside' : 'hovers'}>
                   <WallpaperIcon sx={{color:"#54656F"}}/> 
                <p>Chat wallpaper</p>
               
              
             </div>
             <Divider/>
             <div className={ theme === "dark-theme" ? ' setside' : 'hovers'}>
                <DownloadIcon sx={{color:"#54656F"}}/>
                <p>Media auto-download</p>
             </div>
             <Divider/>
             <div className={ theme === "dark-theme" ? ' setside' : 'hovers'}>
                 <InsertDriveFileIcon sx={{color:"#54656F"}}/>
                <p>Request account info</p>
             </div>
             <Divider/>
             <div className={ theme === "dark-theme" ? ' setside' : 'hovers'}>
                <KeyboardIcon sx={{color:"#54656F"}}/>
                <p>Keyboard shortcuts</p>
             </div>
             <Divider/>
             <div className={ theme === "dark-theme" ? ' setside' : 'hovers'}>
                <HelpIcon sx={{color:"#54656F"}}/>
                <p>Help</p>
             </div>
             <Divider/>
             <div className={ theme !== "light-theme" ? ' setside' : 'hovers'} onClick={()=>logoutUser()}>
                 <Logout sx={{color:"#F15C6D"}}/>
                <p style={{color:"#F15C6D"}}>Log out</p>
             </div>
             
        </div>
         </section>
         <section className='right' style={{backgroundColor: theme === "dark-theme" ? "#F0F2F5" : "#222E35"}}>
                <div className='rightcont'> 
                    <div>
                        {theme === "dark-theme" ? <img src={rightimg} className='rightimg'/> : <img src={darkimg} className='rightimg'/>}
                          <h1>WhatsApp web</h1> 
                          <p>Send and receive message without keeping your phone online <br/>Use WhatsApp on up to 4 linked devices and 1 phone at the same time</p>   
                    </div>
                    <div className='ends'>
                        <img src={lock} width={20}/>
                     <p> End to end encrypted</p>
                    </div>
                </div>
            </section>
    </section>
  )
}

export default Setting
