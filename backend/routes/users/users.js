var express = require('express');
var router = express.Router();
var usersController = require('./controller/userController')
var { verifyToken } = require('../../middleware/authorization')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login-test', function(req, res) {
  console.log(req.body)
  res.send({
    email: req.body.email
  })
})

router.post('/login', usersController.login)

//add route for register
router.post('/register', usersController.register)

//route for token auth
router.post('/authtoken', verifyToken, usersController.authtoken)

//route for deleting the user
router.post('/delete-user', verifyToken, usersController.deleteUser )

router.post('/addToCart', usersController.addToCart)


module.exports = router;

