exports.registerUser = function(req, res, conn) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
        res.status(400).json({
            code: 400,
            response: "Please provide all input fields"
        });
    } else {
        conn.query('INSERT INTO `db`.`users` (`username`, `password`) VALUES (?, ?)', [username, password], 
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
        conn.query('SELECT * FROM `db`.`users` WHERE username = ?', username,
        function (err, result) {
          if (err) {
            logger.error("Error fetching vals\n", err);
          } else {
            if (result.length > 0) {
              if (password == result[0].password) {
                res.status(200).json({
                    code: 200,
                    response: "Username and password combo match."
                });
              } else {
                res.status(401).json({
                    code: 401,
                    response: "Username and password combo do not match"
                });
                logger.error("Error comparing username and password", err);
              } 
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
