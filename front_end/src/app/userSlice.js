import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from '../lib/Axios'
import { authSuccess } from './authSlice'


export const registerUser = createAsyncThunk('user/registerUser', async payloadData => {
    let response = await Axios.post('/users/register', payloadData)
    return response.data
})

export const login = createAsyncThunk('user/login', async(userData, thunkAPI) => {
    try {  
        let response = await Axios.post('/users/login', userData)
        localStorage.setItem('jwtToken', response.data.token)
        thunkAPI.dispatch(authSuccess())
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

export const addToCart = createAsyncThunk('user/addToCart', async payloadData => {
    let response = await Axios.post('/users/addToCart', payloadData)
    return response.data
})

export const usersSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        message: '',
        status: null,
        cart: []
    },
    reducers: {
        setUser: (state, action) => {
            return {
                ...action.payload,
                password: ''
            }
        },
        resetStatus: (state) => {
            state.status = null
        },
        resetUser: (state) => {
            return {
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                message: 'User Logged Out!',
                status: null
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                return {
                    ...action.payload,
                    password: '',
                    status: 'fulfilled'
                }
            })
            .addCase(registerUser.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(login.fulfilled, (state, action)=> {
                state.firstname = action.payload.user.firstname 
                state.lastname = action.payload.user.lastname
                state.email = action.payload.user.email
                state.message = action.payload.message
                state.password = ''
                state.status = 'fulfilled'
                state.cart = action.payload.user.cart
            })
            .addCase(login.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(login.rejected, (state, action) => {
                state.message = action.payload
                state.status = 'rejected'
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                console.log(action.payload)
                return {
                    ...action.payload,
                    password: '',
                    status: 'fulfilled'
                }
            })
    }
})

export const { setUser, resetStatus, resetUser } = usersSlice.actions

export default usersSlice.reducer