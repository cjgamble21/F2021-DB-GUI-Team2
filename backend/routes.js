const { registerUser } = require('./controller');
const pool = require('./db');

const controller = require('./controller');
const middleware = require('./middleware');
const { Router } = require('express');

module.exports = function routes(app, logger) {
    // GET /
    app.get('/', (req, res) => {
        res.status(200).send('Go to 0.0.0.0:3000.');
    }); 
             
  // BEGIN OF PROJECT ROUTES 

  // route for logging in as a registered user
  app.post('/api/login', async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).send('Problem obtaining MySQL connection');
      } else {
        controller.loginUser(req, res, conn);
        conn.release();
      }
    });
  });


  // route for registering a user
  app.post('/api/register', async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).send('Problem obtaining MySQL connection'); 
      } else {
        controller.registerUser(req, res, conn);
        conn.release();
      }
    });
  });

  app.get('/api/test', middleware.checkAuthTrainer, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
      } else {
        controller.userAuthTest(req, res, conn);
        conn.release();
      }
    });
  });

  // route for getting user info
  app.get('/api/:userID', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.getUserInfo(req, res, conn);
        conn.release();
      }
    });
  });

  // route for adding user info to their profile
  app.put('/api/:userID', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.putUserInfo(req, res, conn);
        conn.release();
      }
    });
  });

  //////////////////////////////////////////////////
  // GET 
  //////////////////////////////////////////////////

  // /api/d/{table}
  app.get('/api/d/:table', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.get(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/d/{table}/{variable}
  app.get('/api/d/:table/:variable', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.get(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/d/{table}/{variable}/{value}
  app.get('/api/d/:table/:variable/:value', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.get(req, res, conn);
        conn.release();
      }
    });
  });

  //////////////////////////////////////////////////
  // POST 
  //////////////////////////////////////////////////

  // /api/d/{table}
  app.post('/api/d/:table', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.post(req, res, conn);
        conn.release();
      }
    });
  });

  //////////////////////////////////////////////////
  // PUT 
  //////////////////////////////////////////////////

  // /api/d/{table}/{variable}
  app.put('/api/d/:table/:variable', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.put(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/d/{table}/{variable}/{value}
  app.put('/api/d/:table/:variable/:value', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.put(req, res, conn);
        conn.release();
      }
    });
  });

  //////////////////////////////////////////////////
  // DELETE
  //////////////////////////////////////////////////

  // /api/d/{table}/{variable}
  app.delete('/api/d/:table/:variable', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.delete(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/d/{table}/{variable}/{value}
  app.delete('/api/d/:table/:variable/:value', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: "Problem with MySQL connection"
        });
      } else {
        controller.delete(req, res, conn);
        conn.release();
      }
    });
  });
}