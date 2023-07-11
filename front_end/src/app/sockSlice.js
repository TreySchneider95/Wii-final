import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import Axios from '../lib/Axios'


export const getSocks = createAsyncThunk('socks/getSocks', async data => {
    let response = await Axios.get('socks/')
    return response.data
})



export const sockSlice = createSlice({
    name:'socks',
    initialState:{
        socks:[],
        status:'idle',
        cartSocks:[],
        cartTotal: 0
    },
    reducers: {
        cartCreate: (state, action) => {
            const newCart = state.socks.filter((ele)=>action.payload.includes(String(ele._id)))
            state.cartSocks = newCart
        },
        cartTotal: (state, action) => {
            const subTotal = state.cartSocks.reduce((acc, ele)=>acc + ele.price, 0)
            state.cartTotal = subTotal
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getSocks.fulfilled, (state, action)=>{
                state.socks = action.payload
                state.status = 'complete'
            })
    }
})

export const { cartCreate, cartTotal } = sockSlice.actions

export default sockSlice.reducer