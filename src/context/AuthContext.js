import { createContext, useCallback, useEffect, useState } from "react";
import { PostRequest, baseurl } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()


export const AuthProvider=({children})=>{
     const navigate = useNavigate()
    const[registerinfo,setregisterinfo]=useState({
        fullname:"",
        email:"",
        password:""
    })
    
    const[registerError,setRegisterError]=useState("")
    const[isregisterloading ,setisRegisterloading]=useState(false)

    const[Logininfo,setLogininfo]=useState({
        email:"",
        password:""
    })
    
    const[LoginError,setLoginError]=useState("")
    const[isLoginloading ,setisLoginloading]=useState(false)
    const[user,setUser]=useState(null)
    const[Alluser,SetAlluser]= useState([])
    const[messages,setMessages]=useState({})
    const[activeuser,setActiveuser]=useState([])
    useEffect(()=>{
        const user = localStorage.getItem("users")
        setUser( JSON.parse(user))
    },[registerinfo])


    const UpdateRegisterinfo = useCallback((info)=>{
     setregisterinfo(info)
    },[])
    const RegisterUser= useCallback(async(e)=>{
         e.preventDefault()
        try{
            setisRegisterloading(true)
        setRegisterError(null)
        
        const response = await  PostRequest(`${baseurl}/user/register`,registerinfo)
        setisRegisterloading(false)
         if(response.Error){
           return  setRegisterError(response) 
        }
         
         localStorage.setItem("users",JSON.stringify(response))
          setUser(response)
          setregisterinfo('')      
          }catch(err){
            console.log(err)
            return( setRegisterError(err) , setisRegisterloading(false), setregisterinfo(''))
        }
        
    },[registerinfo])

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("users");
        setUser(null)
        localStorage.removeItem("theme")
        navigate('/login')
    },[]) 

    const updateLoginInfo = useCallback((info)=>{
        setLogininfo(info)
            },[])
    const LoginUser= useCallback(async(e)=>{
        e.preventDefault()
       try{
           setisLoginloading(true)
       setLoginError(null)
       const response = await  PostRequest(`${baseurl}/user/login`,Logininfo)
        setisLoginloading(false)
        if(response.Error){
          return  setLoginError(response) 
       }
        
        localStorage.setItem("users",JSON.stringify(response))
         setUser(response)
        localStorage.setItem("theme",'dark-theme')
       }catch(err){
           console.log(err)
           return setLoginError(err)
       }
       
   },[Logininfo])

 
    return(
        <AuthContext.Provider value={{UpdateRegisterinfo, registerinfo,RegisterUser,user,registerError,isregisterloading,logoutUser,updateLoginInfo,LoginError,isLoginloading,LoginUser,Logininfo,SetAlluser,Alluser,messages,setMessages,activeuser,setActiveuser}}>
            {children}
        </AuthContext.Provider>
    )

}