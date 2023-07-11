const checker = (key, value) => {
    switch (key) {
        case 'firstname':
            //individual matches, so only the first match gets a message returned
            if (value === 'Bob'){
                return {
                    error: true,
                    message: 'Cannot be Bob'
                }
            }
            if (value === ''){
                return {
                    error: true,
                    message: 'Cannot be Empty'
                }
            }
         return {error: false, message: ''}
        case 'lastname':
            //this method can do multiple messages at once
            let returnObj = {error: false, message: ''}
            if (value === ''){
                returnObj = {
                    error: true,
                    message: 'Cannot be Empty'
                }
            }
            if (value === 'Last') {
                returnObj= {
                    error: true, 
                    message: returnObj.message + 'Cannot be Last'
                }
            }
            return returnObj

        case "email":
            // if (!value.includes('@') && !value.includes('.')) {
            //      return {error: true, message: "Not a Valid email"} 
            // }
            let emailRegex = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)
            if (!emailRegex.test(value)) {
                return {
                    error: true, 
                    message: "Not a Valid email"
                }
            }
            return {error: false, message: ''}
        
        case "password":
        let pwdRegEx = new RegExp(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/)
        if (!pwdRegEx.test(value)) {
            return {
                error: true, 
                message: "Password must be complex"
            }
           } 
        return {error: false, message: ''}
        
        default:
         if (value === ''){
                return {
                    error: true,
                    message: 'Cannot be Empty'
                }
            }
         return {error: false, message: ''}
    }
}

export const registrationValidator = (userObj) => {
    let validObj = {}
    for (const key in userObj) {
        const element = userObj[key];
        validObj = {
            ...validObj,
            [key]: checker(key, element)
        }
    }
    return validObj
}