const { registerUser } = require('./controller');
const pool = require('./db');

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

  app.get('/api/test', middleware.checkAuthTrainer, async (req, res) => {
    pool.getConnection(function (err, conn) {
      if (err) {
        logger.error('Problem with MySQL connection');
      } else {
        controller.userAuthTest(req, res, conn);
        conn.release();
      }
    })
  });

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
    })
  });
}