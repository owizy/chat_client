import React, { useContext } from 'react'
import "./message.css"
import moment from "moment"
import { ThemeContext } from '../../../context/Themecontext'
function Messsage({isreadusermessage,content,timestamp}) {
   const {theme} = useContext(ThemeContext)
  return (
    <div className='messagecont' style={{backgroundColor:isreadusermessage?    theme !==  'dark-theme' ? '#fff' :'#202C33' : theme !== 'dark-theme' ? '#D9FDD3' : "#005C4B",
    alignSelf:isreadusermessage? "flex-start":"flex-end",
    padding:"10px",
    color: theme !== 'dark-theme' ? "black" :"#fff",
    display:"flex",
    justifyContent:"flex-start",
    flexDirection:"column",
    alignItems:"flex-start",
    fontFamily:"sans-serif",
    fontWeight:"normal",
    borderTopLeftRadius: isreadusermessage ?   "0px" : "10px" ,
    borderBottom:"35px",
    borderTopRightRadius:!isreadusermessage? "0px" :"10px"
    }}>
    <p style={{justifyContent:"flex-start" , alignItems:"center", wordWrap:"break-word"}}>{content}</p>
    <small className='message-footer' style={{alignSelf:"flex-end", color:"gray", fontSize:"10px"}}>{moment(timestamp).calendar()}</small>
    </div>
  )
}

export default Messsage