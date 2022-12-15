const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
import { Request, Response } from 'express';

const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const now = new Date().getTime();
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
            created_on: now
        };
        console.log("signup", data)
        
        //saving the user
        const user = await User.create(data);
        console.log("user", user)
           //if user details is captured
           //generate token with the user's id and the secretKey in the env file
           // set cookie with the token generated
           if (user) {
             let token = jwt.sign({ id: user.id }, process.env.secretKey, {
               expiresIn: 1 * 24 * 60 * 60 * 1000,
             });

             res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
             console.log("user", JSON.stringify(user, null, 2));
             console.log(token);
             //send users details
             res.status(201);
             res.render('login.html');
           } else {
             return res.status(409).send("Details are not correct");
           }
    } catch (error) {
        console.log(error);
    }
};


//login authentication

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await User.findOne({ email });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                res.status(201);
                return res.redirect("/")
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
};