import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { login, resetStatus } from "../app/userSlice";


const Login = () => {
  const users = useSelector(state => state.users)
  const status = useSelector(state => state.users.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if ( status === 'fulfilled' ) {
      dispatch(resetStatus())
      navigate('/', {replace: true})
    }
  }, [status])

  const [isChecked, setIsChecked] = React.useState(true)
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userObj = {
      email: data.get('email'),
      password: data.get('password'),
      isRemember: isChecked
    };

    dispatch(login(userObj))

  };

    return (
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop:'80px',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 328,
          height: 328,
        },
      }}
    >
      <Paper elevation={3}
        sx={{
            padding:'10px',
            display:'flex',
            justifyContent:'center',
            alignItems: 'center',
            flexDirection: 'column',
        }} >
        <h3>Login</h3>
        <Box component="form" onSubmit={handleSubmit} sx={{display:'flex', justifyContent:'center', flexDirection:"column"}}>
          <TextField name="email" id="email" label="Email" variant="filled" margin="normal" />
          <TextField type="password" name="password" id="password" label="Password" variant="filled" margin="normal" />
          <Box sx={{display:"flex", justifyContent:'center', flexDirection:"column"}}>
                <Button type="submit" sx={{marginTop:'20px', marginX:"20%"}} variant="contained">Submit</Button>
                <Link sx={{marginTop:"15px", textAlign:'center'}} href="/register">New user? Register here</Link>
          </Box>
        </Box>
      </Paper>
    </Box>
    )
}

export default Login