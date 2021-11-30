const pool = require('./db');
const bcrypt = require('bcryptjs');

const controller = require('./controller');
const middleware = require('./middleware');

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

  //////////////////////////////////////////////////
  // TEST PATHS
  //////////////////////////////////////////////////

  // /api/UserDashboard
  app.get('/api/UserDashboard', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        req.body.args.profileID = req.user.profileID;
        controller.getBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/UserDashboard/edit
  app.put('/api/UserDashboard/edit', async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        if (req.body.firstName)
          req.body.args.firstName = req.body.firstName;
        if (req.body.lastName)
          req.body.args.lastName = req.body.lastName;
        if (req.body.age)
          req.body.args.age = req.body.age;
        if (req.body.gender)
          req.body.args.gender = req.body.gender;
        if (req.body.phone)
          req.body.args.phone = req.body.phone;
        if (req.body.email)
          req.body.args.email = req.body.email;
        if (req.body.pfp)
          req.body.args.pfp = req.body.pfp;
        if (req.body.description)
          req.body.args.description = req.body.description;
        controller.putBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/UserDashboard/delete
  app.get('/api/UserDashboard/delete', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        req.body.args.profileID = req.user.profileID;
        controller.deleteBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/UserSessions
  app.get('/api/UserSessions', middleware.checkAuthUser, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {

        req.body.table = 'sessions';
        req.body.args = {};
        req.body.args.userID = req.user.profileID;

        controller.getBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/TrainerDashboard
  app.get('/api/TrainerDashboard', middleware.checkAuthTrainer, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        req.body.args.profileID = req.user.profileID;
        controller.getBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/TrainerDashboard/edit
  app.put('/api/TrainerDashboard/edit', middleware.checkAuthTrainer, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        if (req.body.firstName)
          req.body.args.firstName = req.body.firstName;
        if (req.body.lastName)
          req.body.args.lastName = req.body.lastName;
        if (req.body.age)
          req.body.args.age = req.body.age;
        if (req.body.gender)
          req.body.args.gender = req.body.gender;
        if (req.body.phone)
          req.body.args.phone = req.body.phone;
        if (req.body.email)
          req.body.args.email = req.body.email;
        if (req.body.pfp)
          req.body.args.pfp = req.body.pfp;
        if (req.body.description)
          req.body.args.description = req.body.description;
        if (req.body.rate)
          req.body.args.rate = req.body.rate;
        controller.putTrainer(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/TrainerDashboard/delete
  app.get('/api/TrainerDashboard/delete', middleware.checkAuthTrainer, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        req.body.args.profileID = req.user.profileID;
        controller.deleteBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/TrainerSessions
  app.get('/api/TrainerSessions', middleware.checkAuthTrainer, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'sessions';
        req.body.args = {};
        req.body.args.trainerID = req.user.profileID;
        controller.getBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/getUsers
  app.get('/api/getUsers', async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        req.body.args.userType = 1;
        controller.getBody(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/getTrainers
  app.get('/api/getTrainers', async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem obtaining MySQL connection'
        });
      } else {
        req.body.table = 'profiles';
        req.body.args = {};
        req.body.args.userType = 2;
        controller.getBody(req, res, conn);
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
          message: 'Problem with MySQL connection'
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
          message: 'Problem with MySQL connection'
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
          message: 'Problem with MySQL connection'
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

  // /api/d/{table}/post
  app.post('/api/d/:table/post', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem with MySQL connection'
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

  // /api/d/{table}/{variable}/put
  app.put('/api/d/:table/:variable/put', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem with MySQL connection'
        });
      } else {
        controller.put(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/d/{table}/{variable}/{value}/put
  app.put('/api/d/:table/:variable/:value/put', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem with MySQL connection'
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

  // /api/d/{table}/{variable}/delete
  app.delete('/api/d/:table/:variable/delete', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem with MySQL connection'
        });
      } else {
        controller.delete(req, res, conn);
        conn.release();
      }
    });
  });

  // /api/d/{table}/{variable}/{value}/delete
  app.delete('/api/d/:table/:variable/:value/delete', middleware.checkAuthOwner, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
        res.status(400).json({
          code: 400,
          message: 'Problem with MySQL connection'
        });
      } else {
        controller.delete(req, res, conn);
        conn.release();
      }
    });
  });
}