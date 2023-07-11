import React from "react";
import { cartCreate, cartTotal } from "../app/sockSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSocks } from "../app/sockSlice";
import { Box, Grid } from "@mui/material";
import MediaCard from "./sockCard";


const cart = ()=>{
    const socks = useSelector(state => state.socks)
    const status = useSelector(state => state.socks.status)
    const user = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(()=>{
        if (status === 'idle'){
            dispatch(getSocks())
        }
        dispatch(cartCreate(user.cart))
        dispatch(cartTotal())

    },[user.cart, status])


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    
      const getTaxTotal = (subTotal)=>{
        const tax = subTotal * .1
        const grandTotal = subTotal + tax
        return grandTotal
      }

    return (
        <div className="left">
            <Grid container sx={{padding:'50px'}}>
                <Grid item xs={6}>
                    <Box sx={{display:'flex', flexDirection:'column', marginTop:'30px'}}>
                        {status === "complete" ? 
                            socks.cartSocks.map((sock)=>{
                                return (
                                <Grid sx={{marginY:'10px'}}>
                                    <MediaCard
                                        key={sock._id}
                                        sock={sock}
                                        isCart={true}
                                    ></MediaCard>
                                </Grid>)
                            })
                        : ""}
                    </Box>
                </Grid>
                <Grid item justify="flex-end" xs={6} sx={{marginLeft:'auto'}}>
                    <Grid container direction="row-reverse"> 
                        <Box sx={{display:"flex", flexDirection:'column'}}>
                            <h2>Total</h2>
                            <p>SubTotal: {formatter.format(socks.cartTotal)}</p>
                            <p>Tax: 10%</p>
                            <p>Grand Total: {formatter.format(getTaxTotal(socks.cartTotal))}</p>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            </div>
    )
}

export default cart