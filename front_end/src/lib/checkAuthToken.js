import {setHeaderToken} from './setHeaderToken'

export const checkAuthToken = () => {
    let jwtToken = localStorage.getItem('jwtToken')
 
    if (jwtToken) {
        setHeaderToken(jwtToken)
        return true
    } else {
        setHeaderToken()
        return false
    }
}