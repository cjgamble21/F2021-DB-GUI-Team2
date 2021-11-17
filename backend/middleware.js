const jwt = require('jsonwebtoken');

// function for verification of a valid web token for access of protected routes
exports.checkAuthUser = function(req, res, next) {
    try {
      const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
      req.user = decoded;
      if (decoded.userType == 1 || decoded.userType == 3) {
        next();
      } else {
        res.status(403).json({
          code: 403,
          message: 'User does not have access to protected route.'
        });
      }
    } catch (err) {
      res.status(403).json({
        code: 403,
        message: 'Authorization failed.'
      });
    }
}

exports.checkAuthTrainer = function(req, res, next) {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.user = decoded;
        if (decoded.userType == 2 || decoded.userType == 3) {
          next();
        } else {
          res.status(403).json({
            code: 403,
            message: 'User does not have access to protected route.'
          });
        }
      } catch (err) {
        res.status(403).json({
          code: 403,
          message: 'Authorization failed.'
        });
      }
}

exports.checkAuthOwner = function(req, res, next) {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.user = decoded;
        if (decoded.userType == 3) {
          next();
        } else {
          res.status(403).json({
            code: 403,
            message: 'User does not have access to protected route.'
          });
        }
      } catch (err) {
        res.status(403).json({
          code: 403,
          message: 'Authorization failed.'
        });
      }
}