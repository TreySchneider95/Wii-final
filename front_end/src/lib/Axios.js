import axios from 'axios'

export const Axios = axios.create({
    baseURL: process.env.REACT_APP_AXIOS === 'production' ? '/api' :  "http://localhost:8000/api"
})

export default Axios