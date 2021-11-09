const jwt = require('jsonwebtoken');

// function for verification of a valid web token for access of protected routes
exports.checkAuthUser = function(req, res, next) {
    try {
      const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
      req.userData = decoded;
      if (decoded.userType == 0) {
        next();
      } else {
        res.status(401).json({
          code: 401,
          message: 'User does not have access to protected route.'
        });
      }
    } catch (err) {
      res.status(401).json({
        code: 401,
        message: 'Authorization failed.'
      });
    }
}

exports.checkAuthTrainer = function(req, res, next) {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        if (decoded.userType == 1) {
          next();
        } else {
          res.status(401).json({
            code: 401,
            message: 'User does not have access to protected route.'
          });
        }
      } catch (err) {
        res.status(401).json({
          code: 401,
          message: 'Authorization failed.'
        });
      }
}

exports.checkAuthOwner = function(req, res, next) {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        if (decoded.userType == 2) {
          next();
        } else {
          res.status(401).json({
            code: 401,
            message: 'User does not have access to protected route.'
          });
        }
      } catch (err) {
        res.status(401).json({
          code: 401,
          message: 'Authorization failed.'
        });
      }
}