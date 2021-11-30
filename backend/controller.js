const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.registerUser = function(req, res, conn) {
    var profileID = req.body.profileID;
    var username = req.body.username;
    var password = req.body.password;
    var userType = req.body.userType;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var age = req.body.age;
    var gender = req.body.gender;
    var phone = req.body.phone;
    var email = req.body.email;
    var description = req.body.description;
    var pfp = req.body.pfp;
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
          conn.query('INSERT INTO profiles (profileID, username, password, userType, firstName, lastName, age, gender, phone, email, pfp, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [profileID, username, hash, userType, firstName, lastName, age, gender, phone, email, pfp, description], 
          function (err) {
              if (err) {
                logger.error('Username already exists', err);
                res.status(400).json({
                    code: 400,
                    response: 'Username already taken.'
                });
              } else {
                var profileID;
                conn.query('SELECT profileID FROM profiles WHERE username = ?', username, function(err, result) {
                  if (!err) {
                    profileID = result[0].profileID;
                    if (userType === 1)
                      conn.query('INSERT INTO users (userID) VALUES (?)', profileID, function (err) {
                        if (err) {
                          logger.error('Something happened', err);
                        }
                      });
                    else if (userType === 2)
                      conn.query('INSERT INTO trainers (trainerID, rate) VALUES (?, 0)', profileID, function (err) {
                        if (err) {
                          logger.error('Something happened', err);
                        }
                      });
                    else if (userType === 3)
                      conn.query('INSERT INTO admins (adminID) VALUES (?)', profileID, function (err) {
                        if (err) {
                          logger.error('Something happened', err);
                        }
                      });
                    /*res.status(200).json({
                      code: 200,
                      response: 'User registration successful.'
                    });*/
                  }
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

var functions = new Array();

exports.resetDB = function(req, res, conn) {
  const sqlStatements = fs.readFileSync('./resetDB.sql').toString().split(';');

  conn.query('BEGIN TRANSACTION;');

  sqlStatements.forEach((query) => {
    if (query){
      query += ';';
      conn.query(query, (err) => {
        if (err) logger.error(err);
      });
    }
  });
/*
  functions.push(exports.createGymInfo);
  functions.push(exports.createProfiles);
  functions.push(exports.registerUser);
  functions.push(exports.createGymOwnership);
  functions.push(exports.createReviews);
  functions.push(exports.createSessions);
  functions.push(exports.createWorkouts);
  functions.push(exports.createTrainerSkills);
  functions.reverse();

  exports.resetDBFunction(req, res, conn);
*/
  conn.query('COMMIT;');

  res.status(200).json({
    code: 200,
    message: 'successfully reset database.'
  });
}

exports.resetDBFunction = function(req, res, conn) {
  /*if (functions.length > 0) {
    var f = functions.pop();
    f(req, res, conn);
  }*/
}

exports.createGymInfo = function(req, res, conn) {
  req.body.table = 'gymInfo';
  req.body.args = {};

  req.body.args.gymID = 1;
  req.body.args.name = 'Gym One';
  req.body.args.address = '5910 N US 75-Central Expy 1000, Dallas, TX 75206';
  req.body.args.description = 'The first gym';
  req.body.args.logo = 'https://via.placeholder.com/500';
  exports.postBody(req, res, conn);

  req.body.args.gymID = 2;
  req.body.args.name = 'Gym Two';
  req.body.args.address = '7170 Skillman St #160, Dallas, TX 75231';
  req.body.args.description = 'The second gym';
  req.body.args.logo = 'https://via.placeholder.com/500';
  exports.postBody(req, res, conn);

  req.body.args.gymID = 3;
  req.body.args.name = 'Gym Three';
  req.body.args.address = '5555 E Mockingbird Ln #200, Dallas, TX 75206';
  req.body.args.description = 'The third gym';
  req.body.args.logo = 'https://via.placeholder.com/500';
  exports.postBody(req, res, conn);

  exports.resetDBFunction(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted gymInfo dummy data.'
  });
}

exports.createProfiles = function(req, res, conn) {
  // 1

  req.body.profileID = 1;
  req.body.username = 'user1';
  req.body.password = 'test';
  req.body.userType = 1;
  req.body.firstName = 'john';
  req.body.lastName = 'johnson1';
  req.body.age = 19;
  req.body.gender = 'male';
  req.body.phone = '111-111-1111';
  req.body.email = 'johnjohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 2

  req.body.profileID = 2;
  req.body.username = 'user2';
  req.body.password = 'test';
  req.body.userType = 1;
  req.body.firstName = 'joe';
  req.body.lastName = 'johnson2';
  req.body.age = 40;
  req.body.gender = 'male';
  req.body.phone = '111-111-1112';
  req.body.email = 'joejohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 3

  req.body.profileID = 3;
  req.body.username = 'user3';
  req.body.password = 'test';
  req.body.userType = 1;
  req.body.firstName = 'jill';
  req.body.lastName = 'johnson3';
  req.body.age = 19;
  req.body.gender = 'female';
  req.body.phone = '111-111-1113';
  req.body.email = 'jilljohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 4

  req.body.profileID = 4;
  req.body.username = 'user4';
  req.body.password = 'test';
  req.body.userType = 1;
  req.body.firstName = 'jane';
  req.body.lastName = 'johnson4';
  req.body.age = 40;
  req.body.gender = 'female';
  req.body.phone = '111-111-1114';
  req.body.email = 'janejohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 5

  req.body.profileID = 5;
  req.body.username = 'trainer1';
  req.body.password = 'test';
  req.body.userType = 2;
  req.body.firstName = 'josh';
  req.body.lastName = 'johnson5';
  req.body.age = 19;
  req.body.gender = 'male';
  req.body.phone = '111-111-1115';
  req.body.email = 'joshjohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 6

  req.body.profileID = 6;
  req.body.username = 'trainer2';
  req.body.password = 'test';
  req.body.userType = 2;
  req.body.firstName = 'jack';
  req.body.lastName = 'johnson6';
  req.body.age = 40;
  req.body.gender = 'male';
  req.body.phone = '111-111-1116';
  req.body.email = 'jackjohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 7

  req.body.profileID = 7;
  req.body.username = 'trainer3';
  req.body.password = 'test';
  req.body.userType = 2;
  req.body.firstName = 'jennifer';
  req.body.lastName = 'johnson7';
  req.body.age = 19;
  req.body.gender = 'female';
  req.body.phone = '111-111-1117';
  req.body.email = 'jenniferjohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 8

  req.body.profileID = 8;
  req.body.username = 'trainer4';
  req.body.password = 'test';
  req.body.userType = 2;
  req.body.firstName = 'jackie';
  req.body.lastName = 'johnson8';
  req.body.age = 40;
  req.body.gender = 'female';
  req.body.phone = '111-111-1118';
  req.body.email = 'jackiejohnson@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  // 9

  req.body.profileID = 9;
  req.body.username = 'admin';
  req.body.password = 'test';
  req.body.userType = 3;
  req.body.firstName = 'will';
  req.body.lastName = 'chan';
  req.body.age = 21;
  req.body.gender = 'male';
  req.body.phone = '911';
  req.body.email = 'willchan@gmail.com';
  req.body.pfp = 'https://via.placeholder.com/500';
  req.body.description = 'a generic description';

  exports.registerUser(req, res, conn);

  exports.resetDBFunction(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted profiles dummy data.'
  });
}

exports.createGymOwnership = function(req, res, conn) {
  req.body.table = 'gymOwnership';
  req.body.args = {};

  req.body.args.gymID = 1;
  req.body.args.adminID = 9;
  exports.postBody(req, res, conn);

  req.body.args.gymID = 2;
  req.body.args.adminID = 9;
  exports.postBody(req, res, conn);

  req.body.args.gymID = 3;
  req.body.args.adminID = 9;
  exports.postBody(req, res, conn);

  exports.resetDBFunction(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted gymOwnership dummy data.'
  });
}

exports.createReviews = function(req, res, conn) {
  req.body.table = 'reviews';
  req.body.args = {};

  req.body.args.reviewID = 1;
  req.body.args.message = 'This gym is great!';
  req.body.args.rating = 5;
  req.body.args.gymID = 1;
  exports.postBody(req, res, conn);

  req.body.args.reviewID = 2;
  req.body.args.message = 'This gym is alright';
  req.body.args.rating = 3;
  req.body.args.gymID = 1;
  exports.postBody(req, res, conn);

  req.body.args.reviewID = 3;
  req.body.args.message = 'This gym sucks!';
  req.body.args.rating = 1;
  req.body.args.gymID = 1;
  exports.postBody(req, res, conn);

  req.body.args.reviewID = 4;
  req.body.args.message = 'I love this gym!';
  req.body.args.rating = 5;
  req.body.args.gymID = 2;
  exports.postBody(req, res, conn);


  req.body.args.reviewID = 5;
  req.body.args.message = 'I like this gym';
  req.body.args.rating = 3;
  req.body.args.gymID = 2;
  exports.postBody(req, res, conn);


  req.body.args.reviewID = 6;
  req.body.args.message = 'I hate this gym!';
  req.body.args.rating = 1;
  req.body.args.gymID = 2;
  exports.postBody(req, res, conn);


  req.body.args.reviewID = 7;
  req.body.args.message = 'Fabulous!';
  req.body.args.rating = 5;
  req.body.args.gymID = 3;
  exports.postBody(req, res, conn);


  req.body.args.reviewID = 8;
  req.body.args.message = 'Meh';
  req.body.args.rating = 3;
  req.body.args.gymID = 3;
  exports.postBody(req, res, conn);


  req.body.args.reviewID = 9;
  req.body.args.message = 'Trash!';
  req.body.args.rating = 1;
  req.body.args.gymID = 3;
  exports.postBody(req, res, conn);

  exports.resetDBFunction(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted reviews dummy data.'
  });
}

exports.createOffersRequests = function(req, res, conn) {
  req.body.table = 'offers';
  req.body.args = {};

  req.body.args.offerID = 1;
  req.body.args.trainerID = 5;
  req.body.args.date = '2021-12-05 12:00:00';
  req.body.args.price = 25;
  exports.postBody(req, res, conn);
  
  req.body.args.offerID = 2;
  req.body.args.trainerID = 5;
  req.body.args.date = '2021-12-06 12:00:00';
  req.body.args.price = 25;
  exports.postBody(req, res, conn);

  req.body.args.offerID = 3;
  req.body.args.trainerID = 5;
  req.body.args.date = '2021-12-07 12:00:00';
  req.body.args.price = 25;
  exports.postBody(req, res, conn);

  req.body.args.offerID = 4;
  req.body.args.trainerID = 6;
  req.body.args.date = '2021-12-05 13:00:00';
  req.body.args.price = 35;
  exports.postBody(req, res, conn);
  
  req.body.args.offerID = 5;
  req.body.args.trainerID = 6;
  req.body.args.date = '2021-12-06 13:00:00';
  req.body.args.price = 35;
  exports.postBody(req, res, conn);

  req.body.args.offerID = 6;
  req.body.args.trainerID = 6;
  req.body.args.date = '2021-12-07 13:00:00';
  req.body.args.price = 35;
  exports.postBody(req, res, conn);

  req.body.args.offerID = 7;
  req.body.args.trainerID = 7;
  req.body.args.date = '2021-12-05 14:00:00';
  req.body.args.price = 25;
  exports.postBody(req, res, conn);
  
  req.body.args.offerID = 8;
  req.body.args.trainerID = 7;
  req.body.args.date = '2021-12-06 14:00:00';
  req.body.args.price = 25;
  exports.postBody(req, res, conn);

  req.body.args.offerID = 9;
  req.body.args.trainerID = 7;
  req.body.args.date = '2021-12-07 14:00:00';
  req.body.args.price = 25;
  exports.postBody(req, res, conn);

  req.body.args.offerID = 10;
  req.body.args.trainerID = 8;
  req.body.args.date = '2021-12-05 15:00:00';
  req.body.args.price = 35;
  exports.postBody(req, res, conn);
  
  req.body.args.offerID = 11;
  req.body.args.trainerID = 8;
  req.body.args.date = '2021-12-06 15:00:00';
  req.body.args.price = 35;
  exports.postBody(req, res, conn);

  req.body.args.offerID = 12;
  req.body.args.trainerID = 8;
  req.body.args.date = '2021-12-07 15:00:00';
  req.body.args.price = 35;
  exports.postBody(req, res, conn);

  req.body.table = 'requests';
  req.body.args = {};

  req.body.args.requestID = 1;
  req.body.args.userID = 1;
  req.body.args.trainerID = 5;
  req.body.args.date = '2021-12-08 12:00:00';
  exports.postBody(req, res, conn);
  
  req.body.args.requestID = 2;
  req.body.args.userID = 1;
  req.body.args.trainerID = 5;
  req.body.args.date = '2021-12-09 12:00:00';
  exports.postBody(req, res, conn);
  
  req.body.args.requestID = 3;
  req.body.args.userID = 1;
  req.body.args.trainerID = 5;
  req.body.args.date = '2021-12-10 12:00:00';
  exports.postBody(req, res, conn);

  req.body.args.requestID = 4;
  req.body.args.userID = 2;
  req.body.args.trainerID = 6;
  req.body.args.date = '2021-12-08 13:00:00';
  exports.postBody(req, res, conn);

  req.body.args.requestID = 5;
  req.body.args.userID = 2;
  req.body.args.trainerID = 6;
  req.body.args.date = '2021-12-09 13:00:00';
  exports.postBody(req, res, conn);

  req.body.args.requestID = 6;
  req.body.args.userID = 2;
  req.body.args.trainerID = 6;
  req.body.args.date = '2021-12-10 13:00:00';
  exports.postBody(req, res, conn);

  req.body.args.requestID = 7;
  req.body.args.userID = 3;
  req.body.args.trainerID = 7;
  req.body.args.date = '2021-12-08 14:00:00';
  exports.postBody(req, res, conn);
  
  req.body.args.requestID = 8;
  req.body.args.userID = 3;
  req.body.args.trainerID = 7;
  req.body.args.date = '2021-12-09 14:00:00';
  exports.postBody(req, res, conn);
  
  req.body.args.requestID = 9;
  req.body.args.userID = 3;
  req.body.args.trainerID = 7;
  req.body.args.date = '2021-12-10 14:00:00';
  exports.postBody(req, res, conn);

  req.body.args.requestID = 10;
  req.body.args.userID = 4;
  req.body.args.trainerID = 8;
  req.body.args.date = '2021-12-08 15:00:00';
  exports.postBody(req, res, conn);

  req.body.args.requestID = 11;
  req.body.args.userID = 4;
  req.body.args.trainerID = 8;
  req.body.args.date = '2021-12-09 15:00:00';
  exports.postBody(req, res, conn);

  req.body.args.requestID = 12;
  req.body.args.userID = 4;
  req.body.args.trainerID = 8;
  req.body.args.date = '2021-12-10 15:00:00';
  exports.postBody(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted requests and offers dummy data.'
  });
}

exports.createSessions = function(req, res, conn) {
  req.body.table = 'sessions';
  req.body.args = {};

  req.body.args.sessionNumber = 1;
  req.body.args.trainerID = 5;
  req.body.args.userID = 1;
  req.body.args.date = '2021-12-11 12:00:00';
  exports.postBody(req, res, conn);
  
  req.body.args.sessionNumber = 2;
  req.body.args.trainerID = 5;
  req.body.args.userID = 1;
  req.body.args.date = '2021-12-12 12:00:00';
  exports.postBody(req, res, conn);
  

  req.body.args.sessionNumber = 3;
  req.body.args.trainerID = 5;
  req.body.args.userID = 1;
  req.body.args.date = '2021-12-13 12:00:00';
  exports.postBody(req, res, conn);


  req.body.args.sessionNumber = 4;
  req.body.args.trainerID = 6;
  req.body.args.userID = 2;
  req.body.args.date = '2021-12-11 13:00:00';
  exports.postBody(req, res, conn);


  req.body.args.sessionNumber = 5;
  req.body.args.trainerID = 6;
  req.body.args.userID = 2;
  req.body.args.date = '2021-12-12 13:00:00';
  exports.postBody(req, res, conn);


  req.body.args.sessionNumber = 6;
  req.body.args.trainerID = 6;
  req.body.args.userID = 2;
  req.body.args.date = '2021-12-13 13:00:00';
  exports.postBody(req, res, conn);


  req.body.args.sessionNumber = 7;
  req.body.args.trainerID = 7;
  req.body.args.userID = 3;
  req.body.args.date = '2021-12-11 14:00:00';
  exports.postBody(req, res, conn);
  

  req.body.args.sessionNumber = 8;
  req.body.args.trainerID = 7;
  req.body.args.userID = 3;
  req.body.args.date = '2021-12-12 14:00:00';
  exports.postBody(req, res, conn);
  

  req.body.args.sessionNumber = 9;
  req.body.args.trainerID = 7;
  req.body.args.userID = 3;
  req.body.args.date = '2021-12-13 14:00:00';
  exports.postBody(req, res, conn);


  req.body.args.sessionNumber = 10;
  req.body.args.trainerID = 8;
  req.body.args.userID = 4;
  req.body.args.date = '2021-12-11 15:00:00';
  exports.postBody(req, res, conn);


  req.body.args.sessionNumber = 11;
  req.body.args.trainerID = 8;
  req.body.args.userID = 4;
  req.body.args.date = '2021-12-12 15:00:00';
  exports.postBody(req, res, conn);


  req.body.args.sessionNumber = 12;
  req.body.args.trainerID = 8;
  req.body.args.userID = 4;
  req.body.args.date = '2021-12-13 15:00:00';
  exports.postBody(req, res, conn);

  exports.resetDBFunction(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted sessions dummy data.'
  });
}

exports.createWorkouts = function(req, res, conn) {
  req.body.table = 'workouts';
  req.body.args = {};

  // 1
  req.body.args.workoutID = 1;
  req.body.args.workout = 'jumping jacks';
  req.body.args.description = 'jump up and down with your hands';
  exports.postBody(req, res, conn);

  // 2
  req.body.args.workoutID = 2;
  req.body.args.workout = 'pushups';
  req.body.args.description = 'go up and down on the ground using your arms';
  exports.postBody(req, res, conn);

  // 3
  req.body.args.workoutID = 3;
  req.body.args.workout = 'situps';
  req.body.args.description = 'sit up from a prone position';
  exports.postBody(req, res, conn);

  // 4
  req.body.args.workoutID = 4;
  req.body.args.workout = 'pullups';
  req.body.args.description = 'pull yourself up with your arms on a bar';
  exports.postBody(req, res, conn);

  exports.resetDBFunction(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted workouts dummy data.'
  });
}

exports.createTrainerSkills = function(req, res, conn) {
  req.body.table = 'trainerSkills';
  req.body.args = {};

  req.body.args.workoutID = 1;
  req.body.args.trainerID = 5;
  req.body.args.skill = 5;
  exports.postBody(req, res, conn);

  req.body.args.workoutID = 2;
  req.body.args.trainerID = 5;
  req.body.args.skill = 7;
  exports.postBody(req, res, conn);

  req.body.args.workoutID = 2;
  req.body.args.trainerID = 6;
  req.body.args.skill = 4;
  exports.postBody(req, res, conn);

  req.body.args.workoutID = 3;
  req.body.args.trainerID = 6;
  req.body.args.skill = 6;
  exports.postBody(req, res, conn);

  req.body.args.workoutID = 3;
  req.body.args.trainerID = 7;
  req.body.args.skill = 10;
  exports.postBody(req, res, conn);

  req.body.args.workoutID = 4;
  req.body.args.trainerID = 7;
  req.body.args.skill = 8;
  exports.postBody(req, res, conn);

  req.body.args.workoutID = 1;
  req.body.args.trainerID = 8;
  req.body.args.skill = 5;
  exports.postBody(req, res, conn);

  req.body.args.workoutID = 4;
  req.body.args.trainerID = 8;
  req.body.args.skill = 9;
  exports.postBody(req, res, conn);

  exports.resetDBFunction(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted trainerSkills dummy data.'
  });
}

exports.createAmenities = function(req, res, conn) {
  req.body.table = 'amenities';
  req.body.args = {};

  req.body.args.amenityID = 1;
  req.body.args.title = 'towels';
  req.body.args.description = 'for drying off';
  req.body.args.image = 'https://via.placeholder.com/500';
  exports.postBody(req, res, conn);

  req.body.args.amenityID = 2;
  req.body.args.title = 'water fountains';
  req.body.args.description = 'for drinking';
  req.body.args.image = 'https://via.placeholder.com/500';
  exports.postBody(req, res, conn);

  req.body.args.amenityID = 3;
  req.body.args.title = 'mats';
  req.body.args.description = 'for lying on';
  req.body.args.image = 'https://via.placeholder.com/500';
  exports.postBody(req, res, conn);

  res.status(200).json({
    code: 200,
    message: 'inserted amenities dummy data.'
  });
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
  'admins': ['adminID'],
  'userTypes': ['userType'],
  'workouts': ['workoutID'],
  'gymOwnership': ['gymID', 'adminID'],
  'gymInfo': ['gymID'],
  'reviews': ['reviewID'],
  'offers': ['offerID'],
  'requests': ['requestID'],
  'amenities': ['amenityID']
};

// DEFAULT VALS TO CHANGE FOR THE TABLES
var val = {
  'sessions': ['price'],
  'trainerSkills': ['skill'],
  'profiles': ['description'],
  'users': ['userID'],
  'trainers': ['rate'],
  'adminID': ['adminID'],
  'userTypes': ['description'],
  'workouts': ['description'],
  'gymOwnership': ['adminID'],
  'gymInfo': ['description'],
  'reviews': ['rating'],
  'offers': ['date'],
  'requests': ['date']
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

exports.getTrainer = function(req, res, conn) {
  var table1 = 'profiles';
  var table2 = 'trainers';

  var result = joinKeys(req.body, 'get');

  var query = 'SELECT * FROM '.concat(table1).concat(' join ').concat(table2).concat(' ON ').concat(table1).concat('.profileID = ').concat(table2).concat('.trainerID ');

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
    else { /*res.json(result);*/ }
  });
}

exports.putTrainer = function(req, res, conn) {
  // get the params from the body
  var table = req.body.table;
  var variable = req.body.variable;
  var value = req.body.value;

  // get the key-value pairs from the body args
  req.body.args.profile = {};
  const keys = Object.keys(object);

  // initialization of the key and value lists
  var keyList = [];
  var valueList = [];

  // push all of the keys and values to their lists with correct formatting
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] != 'rate')
      req.body.args.profile[keys[i]] = object[keys[i]];
  }
  var result = joinKeys(req.body.args.profile, 'put');

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
    else {
      if (req.body.args.rate)
        conn.query('UPDATE trainers SET rate = '.concat(req.body.args.rate).concat(' WHERE ').concat(key['trainers'][0]).concat(' = ').concat(variable));
      res.json(result);
    }
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
    else { /*res.json(result);*/ }
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