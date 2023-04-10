const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const dotenv =  require('dotenv');

// Config 
dotenv.config({path:"backend/config/config.env"});


app.use(cookieParser())

//after cloudnary
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}))
app.use(fileupload())
app.use(bodyParser.json({limit: '50mb'}));

//to add multiple images placing express.json() AFTER bodyParser.
//if runing express.json() first, express would set the global limit to 1mb.
app.use(express.json())


//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoutes")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

//Middleware for error
app.use(errorMiddleware)



module.exports =  app;