const express = require('express')
import { Response, Request } from "express"
const userController = require('../controllers/userController')
const { signup, login } = userController
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

//signup endpoint
router.get('/signup', (req: Request, res: Response) => {
    res.status(200);
    res.render("signup.html")
})
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)

router.get('/login', (req: Request, res: Response) => {
    res.status(200);
    res.render("login.html")
})
//login route
router.post('/login', login )

module.exports = router