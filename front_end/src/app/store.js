import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sockReducer from './sockSlice'
import userReducer from './userSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    socks: sockReducer,
    users: userReducer,
    auth: authReducer,
  },
});
