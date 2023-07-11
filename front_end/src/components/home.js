import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSocks } from "../app/sockSlice";
import MediaCard from "./sockCard";
import Grid from '@mui/material/Unstable_Grid2'
import '../App.css';
import { createBrowserRouter } from 'react-router-dom';



const Home = ()=>{
    const socks = useSelector(state => state.socks)
    const status = useSelector(state => state.socks.status)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (status === 'idle'){
                dispatch(getSocks())
        }
    }, [status, dispatch])


    return(
        <div>
           <div className="container">
                <h1>Socks4U</h1>
            </div>
            <div className="container-s">
                <p>Here you'll get to see our whole collection of wonderful socks</p>
            </div>
            <div className="container">
                <Grid container spacing={2}>
                    {status === "complete" ? 
                        socks.socks.map((sock)=>{
                            return (
                            <Grid className='container' xs={4}>
                                <MediaCard
                                    key={sock._id}
                                    sock={sock}
                                ></MediaCard>
                            </Grid>)
                        })
                    : ""}
                </Grid>
            </div>
        </div>
    )
}

export default Home