const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = function(req, res, conn) {
    var username = req.body.username;
    var password = req.body.password;
    var userType = req.body.userType;
    if (!username || !password) {
      res.status(400).json({
          code: 400,
          response: "Please provide all input fields"
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            code: 500,
            response: "Error with bcrypt hash.",
            error: err
          });
        } else {
          console.log(userType);
          conn.query('INSERT INTO `db`.`profiles` (`username`, `password`, `userType`) VALUES (?, ?, ?)', [username, hash, userType], 
          function (err) {
              if (err) {
                logger.error("Username already exists", err);
                res.status(400).json({
                    code: 400,
                    response: "Username already taken."
                });
              } else {
                  res.status(200).json({
                      code: 200,
                      response: "User registration successful."
                  });
              }
          });
        }
    }); 
  }
}

exports.loginUser = function(req, res, conn) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(400).json({
            code: 400,
            response: "Please provide all input fields"
        });
    } else {
        conn.query('SELECT * FROM `db`.`profiles` WHERE username = ?', username,
        function (err, result) {
          if (err) {
            logger.error("Error fetching vals\n", err);
          } else {
            if (result.length > 0) {
              bcrypt.compare(password, result[0].password, (err, hashRes) => {
                if (err) {
                  res.status(500).json({
                    code: 500, 
                    response: "Error hashing password."
                  });
                } else {
                  // if result of compare function is true, the username and password match
                  if (hashRes) {
                    // create a JSON web token for the login session to access protected routes
                    const token = jwt.sign({
                      username: result[0].username,
                      userID: result[0].userID,
                      userType: result[0].userType
                    }, process.env.JWT_KEY, 
                  {
                    expiresIn: "1h"
                  });
                    res.status(200).json({
                      code: 200,
                      response: "Username and password combo match.",
                      token: token
                    });
                  } else {
                    logger.error("Error comparing username and password", err);
                    res.status(401).json({
                      code: 401,
                      response: "Username and password combo do not match"
                  });
                }
              }
            });
           } else {
              res.status(401).json({
                  code: 401,
                  response: "Username does not exist."
              });
              logger.error("Error finding username");
            }
          }
        });
      }
    }

// function for verification of a valid web token for access of protected routes
exports.checkAuth = function(req, res, next) {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      code: 401,
      message: 'Authorization failed'
    });
  }
}

exports.userAuthTest = function(req, res, conn) {
  conn.query('SELECT * FROM profiles', async (err, result) => {
      if (err) {
        logger.error('Error');
      } else {
        res.status(200).json({
          code: 200,
          message: 'Auth success.',
        });
        res.end(JSON.stringify(result));
      }
  });

}