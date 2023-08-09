import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Component/Homepage';
import Status from './Component/Status/Status';
import Statusview from './Component/Status/Statusview';
import Setting from './Component/Chatcard/Profile/setting';
import Register from './pages/Register';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Statususercard from './Component/Status/Statususercard';
function App() {
   const {user} = useContext(AuthContext)
   const[isloading,Setisloading]=useState(true)

  useEffect(()=>{

    setTimeout(() => {
      Setisloading(false)
    }, 4000);
  },[]) 
  return (
    <>
    {
    isloading ?
     (<div className='dotconts'>
    <div class="loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>

    </div>)
    
    :(<div className="App">
           <Routes>
            <Route path='/' element={ user ?<Homepage/>: <Register/> }/>
            <Route path='/status' element={<Status/>}/>
            <Route path='/status/:userid' element={<Statusview/>}/>
            <Route path='/sets'  element={  <Setting/>}/>
            <Route path='/register' element={user ? <Homepage/> : <Register/>}/>
            <Route path='/login' element={user ?  <Homepage/> :<Login/>}/>
            <Route path='/statuscard' element={<Statususercard/>}></Route>
            </Routes>  
          </div>)
    
}    </>
  );
}

export default App;
