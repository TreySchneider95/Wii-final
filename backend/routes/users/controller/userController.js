const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { createUser, hashPassword, comparePasswords } = require('./usersHelper')

module.exports = {
    login: async (req, res) => {
        try {
            let foundUser = await User.findOne({email: req.body.email})
            if (!foundUser) {
                throw {
                    status: 404,
                    message: "User Not Found"
                }
            }          
            let checkedPassword = await comparePasswords(req.body.password, foundUser.password)
            console.log(foundUser)
            if (!checkedPassword) {
                throw {
                    status: 401,
                    message: "Invalid Password"
                }
            }
            let payload = {
                id: foundUser._id,
                email: foundUser.email
            }
            let token = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 60*60})
            res.status(200).json({
                email: req.body.email,
                user: foundUser,
                message: "Successful Login!!",
                token: token
            })  
        } catch (error) {
            res.status(error.status).json(error.message)
        }
    },
    register: async (req, res) => {
        try {
            let foundUser = await User.findOne({email: req.body.email})
            if (foundUser) {
                throw {
                    status: 409,
                    message: "User Exists"
                }
            }
            let newUser = await createUser(req.body)
            console.log(newUser)
            let hashedPassword = await hashPassword(newUser.password)
            newUser.password = hashedPassword
            let savedUser = await newUser.save()
            res.status(200).json({
                    userObj: savedUser,
                    message: "Successfully Registered"
                }) 
        } catch (error) {
            res.status(error.status).json(error.message)
        }
        
    },
    authtoken: async (req, res) => {
        console.log('!@-------req.decoded-------@!')
        console.log(req.decoded)
        
        let foundUser = await User.findById(req.decoded.id)

        res.status(200).json({
            email: foundUser.email,
            firstname: foundUser.firstname,
            cart: foundUser.cart,
            message: "Successful Token Login!!"
        })


    },
    deleteUser: async (req, res) => {
        try {
            let foundUser = await User.findByIdAndDelete(req.decoded.id)
            res.send(true)
        } catch (error) {
            res.send(false)
        }
        
    },
    addToCart: async (req, res) => {
        try {
            let foundUser = await User.findOne({email: req.body.email})
            foundUser.cart.push(req.body.item)
            foundUser.save()
            res.status(200).json({
                email: foundUser.email,
                firstname: foundUser.firstname,
                cart: foundUser.cart,
                message: "Item Added to cart"
            })
            
        } catch (error) {
            res.status(error.status).json(error.message)
        }
    }
    

}
