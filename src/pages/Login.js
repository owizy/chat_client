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

function Login() {
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
     const{ updateLoginInfo,LoginError,isLoginloading,LoginUser,Logininfo} = useContext(AuthContext)  
     const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);
   
  useEffect(()=>{
    if(LoginError?.message){
      setOpen(true)
   }
  },[LoginError])
    console.log("err",LoginError?.message)

  const handleClick = () => {
    setOpen(true);
  };
  console.log("login",Logininfo)
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
         {LoginError?.message}
        </Alert>
      </Snackbar>
      <div className='l-containerlog'>
        <h1>Login</h1>
     <form onSubmit={LoginUser}>
     <TextField id="standard-basic" label="email" variant="standard"  type='email' onChange={(e)=>updateLoginInfo({ ...Logininfo,email:e.target.value})} value={Logininfo.email}/>
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
            value={Logininfo.password}
           onChange={(e)=>updateLoginInfo({...Logininfo,password:e.target.value})} />
        </FormControl>
          <div className='btncont'>
          {isLoginloading ?    <CircularProgress disableShrink /> : <button type='submit'>Login</button>}
          </div>
          <div className='members'>
            <p>Not a member ? <Link to={'/register'}>Signup</Link></p>
          </div>
     </form>

      </div>
    </section>
  )
}

export default Login