import { Request, Response, NextFunction } from 'express';
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.users;

const saveUser = async (req: Request, res: Response, next: NextFunction) => {
  //search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      //return res.json(409).send("username already taken");
      res.status(409);
      return res.render('signup.html', {errorMsg: "username already taken"});
      
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      //return res.json(409).send("Authentication failed");
      res.status(409);
      return res.render('signup.html', {errorMsg: "There is a username registered with this email already."});
    }

    next();
  } catch (error) {
    console.log(error);
  }

};

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if(!req.cookies.jwt){
    res.status(200);
    res.redirect("/users/login");
  }
  else if(req.cookies.jwt){
    try {
      const data = jwt.verify(req.cookies.jwt, process.env.secretKey);
      if(data)return next();
      else{
        res.status(200);
        res.redirect("/users/login");
      }
    } catch {
      res.status(200);
      res.redirect("/users/login");
    }
  }
}

module.exports = {
  saveUser,
  isAuthenticated
};