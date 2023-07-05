const User = require('../model/User')
const bcrypt = require('bcrypt')


const saltRounds = 10

const createUser = (params) => {
    let newUser = new User({
        email: params.email,
        password: params.password,
        firstname: params.firstname,
        lastname: params.lastname,
        phonenumber:params.phonenumber
    })
    return newUser
}

const hashPassword = (password) => {
    let hashedPassword = bcrypt.hash(password, saltRounds)
    return hashedPassword
}

const comparePasswords = (plaintextPassword, dbPassword) => bcrypt.compare(plaintextPassword, dbPassword)


module.exports = { createUser, hashPassword, comparePasswords }