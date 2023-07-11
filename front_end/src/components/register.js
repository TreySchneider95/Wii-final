import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser, resetStatus } from "../app/userSlice";



const Register = () => {
    const users = useSelector( state => state.users)
    const status = useSelector( state => state.users.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (status === 'fulfilled') {
            dispatch(resetStatus())
            navigate("/login", {replace: true})
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let userObj = {
          firstname: data.get('first-name'),
          lastname: data.get('last-name'),
          email: data.get('email'),
          phonenumber: data.get('phone-number'),
          password: data.get('password'),
        };
        console.log(userObj)
    
        // let isErrors = false;
        
        // if (userObj.password !== data.get('password2')) {
        //   isErrors = true
        //   setPwdMatch({
        //     error: true,
        //     message: "Passwords do not Match"
        //   })
        // } else {
        //   setPwdMatch({
        //       error: false,
        //       message: ''
        //     })
       
        // }
    
        dispatch(registerUser(userObj))
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
            width: 528,
            height: 528,
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
          <h3>Register</h3>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item="true" sx={{display:'flex', justifyContent:'center'}} xs={6}>
                    <TextField name="email" id="email" fullWidth label="Email" variant="filled" margin="normal" />
                </Grid>
                <Grid item="true" sx={{display:'flex', justifyContent:'center'}} xs={6}>
                    <TextField name="first-name" fullWidth id="first-name" label="First Name" variant="filled" margin="normal" />
                </Grid>
                <Grid sx={{display:'flex', justifyContent:'center'}} xs={6}>
                    <TextField name="last-name" fullWidth id="last-name" label="Last Name" variant="filled" margin="normal" />
                </Grid>
                <Grid sx={{display:'flex', justifyContent:'center'}} xs={6}>
                    <TextField name='phone-number' fullWidth id="phone-number" label="Phone Number" variant="filled" margin="normal" />
                </Grid>
                <Grid sx={{display:'flex', justifyContent:'center'}} xs={6}>
                    <TextField type="password" name="password" fullWidth id="password" label="Password" variant="filled" margin="normal" />
                </Grid>
                <Grid sx={{display:'flex', justifyContent:'center'}} xs={6}>
                    <TextField type="password" name="re-password" fullWidth id="re-password" label="Re-enter Password" variant="filled" margin="normal" />
                </Grid>

            </Grid>
            <Box sx={{display:"flex", justifyContent:'center', flexDirection:"column"}}>
                <Button type="submit" sx={{marginTop:'20px', marginX:"20%"}} variant="contained">Submit</Button>
                <Link sx={{marginTop:"15px", textAlign:'center'}} href="/login">Already a user? click here</Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
}

export default Register