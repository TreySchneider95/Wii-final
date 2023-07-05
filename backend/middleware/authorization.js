const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization
        if (bearerToken) {
            console.log(bearerToken)
            const token = bearerToken.split(' ')[1]
            let decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.decoded = decoded
            next()  
        } 
    } catch (error) {
       res.status(error.status || 401).json(error.message) 
    }
    
   
  
}

module.exports = { verifyToken }