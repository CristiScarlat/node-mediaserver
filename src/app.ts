import express, { Application, Request, Response } from 'express';
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
 const db = require('./models')
 const userRoutes = require ('./routes/userRoutes')
 const { isAuthenticated } = require('./middlewares/userAuth');

const app: Application = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port: number = 5000;

app.use(express.static('public'));

app.set('view engine', 'nunj');

nunjucks.configure('./views', {
  autoescape: true, 
  express: app
});

//routes for the user API
app.use('/users', userRoutes);

app.get('/', isAuthenticated, (req: Request, res: Response) => {
  //TODO get this through a middleware for auth checking
  res.status(200);
  res.render('home.html');
})

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
