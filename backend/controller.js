const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = function(req, res, conn) {
    var username = req.body.username;
    var password = req.body.password;
    var userType = req.body.userType;
    if (!username || !password) {
      res.status(400).json({
          code: 400,
          response: 'Please provide all input fields'
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            code: 500,
            response: 'Error with bcrypt hash.',
            error: err
          });
        } else {
          console.log(userType);
          conn.query('INSERT INTO profiles (username, password, userType) VALUES (?, ?, ?)', [username, hash, userType], 
          function (err) {
              if (err) {
                logger.error('Username already exists', err);
                res.status(400).json({
                    code: 400,
                    response: 'Username already taken.'
                });
              } else {
                res.status(200).json({
                  code: 200,
                  response: 'User registration successful.'
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
            response: 'Please provide all input fields'
        });
    } else {
        conn.query('SELECT * FROM profiles WHERE username = ?', username,
        function (err, result) {
          if (err) {
            logger.error('Error fetching vals\n', err);
          } else {
            if (result.length > 0) {
              bcrypt.compare(password, result[0].password, (err, hashRes) => {
                if (err) {
                  res.status(500).json({
                    code: 500, 
                    response: 'Error hashing password.',
                    error: err
                  });
                } else {
                  // if result of compare function is true, the username and password match
                  if (hashRes) {
                    // create a JSON web token for the login session to access protected routes
                    const token = jwt.sign({
                      username: result[0].username,
                      profileID: result[0].profileID,
                      userType: result[0].userType
                    }, process.env.JWT_KEY, 
                    {
                      expiresIn: '1h'
                    });

                    var response = {
                      code: 200,
                      response: 'Username and password combo match.',
                      token: token
                    };
                    response['user'] = result[0];
                    res.status(200).json(response);
                  } else {
                    logger.error('Error comparing username and password', err);
                    res.status(401).json({
                      code: 401,
                      response: 'Username and password combo do not match'
                    });
                  }
                }
              });
            } else {
              res.status(401).json({
                  code: 401,
                  response: 'Username does not exist.'
              });
              logger.error('Error finding username');
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
        message: 'Please provide a userID'
      });
    } else {
      conn.query('SELECT * FROM profiles WHERE profileID = ?', userID, 
      async (err, result) => {
        if (err) {
          logger.error('Error fetching data.');
          res.status(400).json({
            code: 400,
            message: 'Error fetching user data.'
          });
        } else {
          res.json(result);
        }
      });
    }
}

// #Write a get method to join the two tables on controller.js
// #Ex: join profiles and trainers -> make sure rate is added but only
// #have rows where profileID == trainerID
exports.getJoinRate = function(req, res, conn){
  var userID = req.params.userID;
    if (!userID) {
      res.status(400).json({
        code: 400,
        message: 'Please provide a userID'
      });
    } else {
        conn.query('SELECT * FROM profiles WHERE' +
            'profileID = ? JOIN trainers ' +
            'ON p.profileID = t.profileID');
        async (err, result) => {
        if (err) {
          logger.error('Error fetching data.');
          res.status(400).json({
            code: 400,
            message: 'Error fetching user data.'
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
      message: 'Please provide a userID'
    });
  } else {
    conn.query('UPDATE profiles SET '.concat(putJoinKeys(req.body)).concat(' WHERE profileID = ?'), userID,
    async (err, result) => {
      if (err) {
        logger.error('Error inserting data');
        res.status(400).json({
          code: 400,
          message: 'Error inserting data',
          error: err
        });
      } else {
        res.status(200).json({
          code: 200,
          message: 'Data inserted!'
        });
      }
    });
  }
}

//////////////////////////////////////////////////
// DYNAMIC METHODS
//////////////////////////////////////////////////

// DEFAULT KEYS FOR THE TABLES
var key = {
  'sessions': ['sessionNumber'],
  'trainerSkills': ['workoutID', 'trainerID'],
  'profiles': ['profileID'],
  'users': ['userID'],
  'trainers': ['trainerID'],
  'userTypes': ['userType'],
  'workouts': ['workoutID']
};

// DEFAULT VALS TO CHANGE FOR THE TABLES
var val = {
  'sessions': ['price'],
  'trainerSkills': ['skill'],
  'profiles': ['description'],
  'users': ['userID'],
  'trainers': ['rate'],
  'userTypes': ['description'],
  'workouts': ['description']
};

exports.get = function(req, res, conn) {
  // get the params from the link
  var table = req.params.table;
  var variable = req.params.variable;
  var value = req.params.value;

  // get the key-value pairs from the body
  var result = joinKeys(req.body, 'get');

  // set the initial query
  var query = 'SELECT * FROM '.concat(table);

  // explicit table, explicit variable, and explicit value
  if (value != null)
    query = query.concat(' WHERE ').concat(variable).concat(' = \'').concat(value).concat('\'');

  // explicit table, implicit default variable, and explicit value
  else if (variable != null)
    query = query.concat(' WHERE ').concat(key[table][0]).concat(' = \'').concat(variable).concat('\'');

  // explicit table, variable and value gotten from body
  else if (table != null)
    if (result[0].length > 0) { query = query.concat(' WHERE ').concat(result[0]); }

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error getting data');
      res.status(400).json({
        code: 400,
        message: 'Error fetching from '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

exports.getBody = function(req, res, conn) {
  // get the params from the body
  var table = req.body.table;

  // get the key-value pairs from the body args
  var result = joinKeys(req.body.args, 'get');

  // set the initial query
  var query = 'SELECT * FROM '.concat(table);

  // append args if key-value pairs exist
  if (result[0].length > 0) { query = query.concat(' WHERE ').concat(result[0]); }

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error getting data');
      res.status(400).json({
        code: 400,
        message: 'Error fetching from '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

exports.post = function(req, res, conn) {
  // get the params from the link
  var table = req.params.table;
  
  // get the key-value pairs from the body
  var result = joinKeys(req.body, 'post');

  // set the initial query
  var query = 'INSERT INTO '.concat(table).concat(' (').concat(result[0]).concat(') VALUES (').concat(result[1]).concat(')');

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error inserting into table');
      res.status(400).json({
        code: 400,
        message: 'Error inserting into '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

exports.postBody = function(req, res, conn) {
  // get the params from the body
  var table = req.body.table;
  
  // get the key-value pairs from the body args
  var result = joinKeys(req.body.args, 'post');

  // set the initial query
  var query = 'INSERT INTO '.concat(table).concat(' (').concat(result[0]).concat(') VALUES (').concat(result[1]).concat(')');

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error inserting into table');
      res.status(400).json({
        code: 400,
        message: 'Error inserting into '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

exports.put = function(req, res, conn) {
  // get the params from the link
  var table = req.params.table;
  var variable = req.params.variable;
  var value = req.params.value;

  // get the key-value pairs from the body
  var result = joinKeys(req.body, 'put');

  // set the initial query
  var query = 'UPDATE '.concat(table).concat(' SET ').concat(result[0]);

  // check for the params
  if (value != null)
    query = query.concat(' WHERE ').concat(variable).concat(' = ').concat(value);
  else
    query = query.concat(' WHERE ').concat(key[table][0]).concat(' = ').concat(variable);

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error updating table');
      res.status(400).json({
        code: 400,
        message: 'Error updating '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

exports.putBody = function(req, res, conn) {
  // get the params from the body
  var table = req.body.table;
  var variable = req.body.variable;
  var value = req.body.value;

  // get the key-value pairs from the body args
  var result = joinKeys(req.body.args, 'put');

  // set the initial query
  var query = 'UPDATE '.concat(table).concat(' SET ').concat(result[0]);

  // check for the params
  if (value != null)
    query = query.concat(' WHERE ').concat(variable).concat(' = ').concat(value);
  else
    query = query.concat(' WHERE ').concat(key[table][0]).concat(' = ').concat(variable);

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error updating table');
      res.status(400).json({
        code: 400,
        message: 'Error updating '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

exports.delete = function(req, res, conn) {
  // get the params from the link
  var table = req.params.table;
  var variable = req.params.variable;
  var value = req.params.value;

  // get the key-value pairs from the body
  var result = joinKeys(req.body, 'delete');

  // set the initial query
  var query = 'DELETE FROM '.concat(table).concat(' WHERE ')

  // check for the params
  if (value != null)
    query = query.concat(variable).concat(' = ').concat(value);
  else if (variable != null)
    query = query.concat(key[table][0]).concat(' = ').concat(variable);
  else if (result[0].length > 0)
    query = query.concat(result[0]);

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error updating table');
      res.status(400).json({
        code: 400,
        message: 'Error deleting from '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

exports.deleteBody = function(req, res, conn) {
  // get the params from the body
  var table = req.body.table;

  // get the key-value pairs from the body args
  var result = joinKeys(req.body.args, 'delete');

  // set the initial query
  var query = 'DELETE FROM '.concat(table).concat(' WHERE ').concat(result[0]);

  // send the query
  conn.query(query, async (err, result) => {
    if (err) {
      logger.error('Error updating table');
      res.status(400).json({
        code: 400,
        message: 'Error deleting from '.concat(table).concat('.'),
        error: err
      });
    }
    else { res.json(result); }
  });
}

var joinKeys = function(object, type) {
  // result of the joined keys
  var result = ["", ""];

  // returns the array of keys and array of values given a json object
  var [k, v] = getKeyValues(object);

  // loop through and push the key value pairs to the string with correct formatting
  for (var i = 0; i < k.length; i++) {
    if (k[i] == 'token') {
      continue;
    }
    if (type == 'get') {
      result[0] = result[0].concat(k[i]).concat('=').concat(v[i]);
      if (i < k.length-1)
        result[0] = result[0].concat(' AND ');
    }
    else if (type == 'post') {
      result[0] = result[0].concat(k[i])
      result[1] = result[1].concat(v[i])
      if (i < k.length-1) {
        result[0] = result[0].concat(',');
        result[1] = result[1].concat(',');
      }
    }
    else if (type == 'put') {
      result[0] = result[0].concat(k[i]).concat('=').concat(v[i]);
      if (i < k.length-1)
        result[0] = result[0].concat(',');
    }
    else if (type == 'delete') {
      result[0] = result[0].concat(k[i]).concat('=').concat(v[i]);
      if (i < k.length-1)
        result[0] = result[0].concat(' AND ');
    }
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