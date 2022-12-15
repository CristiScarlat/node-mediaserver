const express = require('express')
import { Response, Request } from "express"

const router = express.Router()

//movies endpoint
router.get('/movies', (req: Request, res: Response) => {
    res.status(200);
    res.render("movies.html")
})
// //passing the middleware function to the signup
// router.post('/signup', userAuth.saveUser, signup)

// //login route
// router.post('/login', login )

module.exports = router