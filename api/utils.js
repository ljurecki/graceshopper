const { UnauthorizedError } = require('../errors');

function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401).send({
      error: 'Unauthorized user',
      name: 'UnauthorizedUserError',
      message: UnauthorizedError(),
    });
  } else {
    next();
  }
}

module.exports = {
  requireUser,
};