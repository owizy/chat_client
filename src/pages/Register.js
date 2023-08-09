import React, { useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import "./Register.css"
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
function Register() {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
     const{ UpdateRegisterinfo , registerinfo,RegisterUser,registerError,isregisterloading} = useContext(AuthContext)  
     const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
   
  useEffect(()=>{
    if(registerError?.message){
      setOpen(true)
   }
  },[registerError])
    console.log("err",registerError?.message)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
     
    return (
    <section className='containers'>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
         {registerError?.message}
        </Alert>
      </Snackbar>
      <div className='l-container'>
        <h1>Register</h1>
     <form onSubmit={RegisterUser}>
     <TextField id="standard-basic" label="fullname" variant="standard"   value={registerinfo.fullname} onChange={(e)=>UpdateRegisterinfo({ ...registerinfo,fullname:e.target.value})}/>
     <TextField id="standard-basic" label="email" variant="standard"  type='email' onChange={(e)=>UpdateRegisterinfo({ ...registerinfo,email:e.target.value})} value={registerinfo.email}/>
     <FormControl sx={{ m: 1,}} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={registerinfo.password}
           onChange={(e)=>UpdateRegisterinfo({...registerinfo ,password:e.target.value})} />
        </FormControl>
          <div className='btncont'>
          { isregisterloading ?  <CircularProgress disableShrink/>:<button type='submit'>Register</button>}
          </div>
          <div className='members'>
            <p>member ? <Link to={'/login'}>Login</Link></p>
          </div>
     </form>

      </div>
    </section>
  )
}

export default Register