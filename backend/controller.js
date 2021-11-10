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
                    response: "Error hashing password.",
                    error: err
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

exports.userAuthTest = function(req, res, conn) {
  conn.query('SELECT * FROM profiles', async (err, result) => {
      if (err) {
        logger.error('Error');
      } else {
        res.status(200).json({
          code: 200,
          message: 'Auth success.'
        });
      }
  });

}

// returns all info in a user's profile (userID is a parameter in the url)
exports.getUserInfo = function(req, res, conn) {
  var userID = req.params.userID;
    if (!userID) {
      res.status(400).json({
        code: 400,
        message: "Please provide a userID"
      });
    } else {
      conn.query('SELECT * FROM profiles WHERE profileID = ?', userID, 
      async (err, result) => {
        if (err) {
          logger.error("Error fetching data.");
          res.status(400).json({
            code: 400,
            message: "Error fetching user data."
          });
        } else {
          res.json(result);
        }
      });
    }
}

exports.putUserInfo = function(req, res, conn) {
  var userID = req.params.userID;
  if (!userID) {
    res.status(400).json({
      code: 400,
      message: "Please provide a userID"
    });
  } else {
    conn.query('UPDATE profiles SET '.concat(joinKeys(req.body)).concat(' WHERE profileID = ?'), userID,
    async (err, result) => {
      if (err) {
        logger.error("Error inserting data");
        res.status(400).json({
          code: 400,
          message: "Error inserting data",
          error: err
        });
      } else {
        res.status(200).json({
          code: 200,
          message: "Data inserted!"
        });
      }
    });
  }
}

var joinKeys = function(object) {
  // string result of the joined keys
  var result = "";

  // returns the array of keys and array of values given a json object
  var [k, v] = getKeyValues(object);

  // loop through and push the key value pairs to the string with correct formatting
  for (var i = 0; i < k.length; i++) {
    if (k[i] == "token") {
      continue;
    }
    result = result.concat(k[i]).concat('=').concat(v[i]);
    if (i < k.length-2)
      result = result.concat(',');
  }
  return result;
}

var getKeyValues = function(object) {
  // get the json key-value pairs and assign it to a variable
  const keys = Object.keys(object);

  // initialization of the key and value lists
  var keyList = [];
  var valueList = [];

  // push all of the keys and values to their lists with correct formatting
  for (let i = 0; i < keys.length; i++) {
    keyList[i] = keys[i];
    valueList[i] = '\''.concat(object[keys[i]]).concat('\'');
  }
  return [keyList, valueList];
}