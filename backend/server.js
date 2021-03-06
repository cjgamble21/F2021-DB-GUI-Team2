require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
// const mysqlConnect = require('./db');
const routes = require('./routes');

// set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0'
};

// create the express.js object
const app = express()/*.use(function (req, res, next) {
  if (req.header('x-forwarded-proto') != 'http') {
    //console.log(res.hasHeader());
    return;
  }
  next();
})*/;

// create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

// specify middleware to use
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://ec2-3-139-91-59.us-east-2.compute.amazonaws.com:3000',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));
app.use(ExpressAPILogMiddleware(logger, { request: true }));  
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true}));

//include routes
routes(app, logger);

// connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
