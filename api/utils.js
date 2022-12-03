const { UnauthorizedError } = require('../errors');

function requireUser(req, res, next) {
  if (!req.user) {
    console.log('HEELLLLLLOOOOOOO')
    res.status(401).send({
      error: 'Unauthorized user',
      name: 'UnauthorizedUserError',
      message: UnauthorizedError(),
    });
  } else {
    console.log("FROM REQUIRE USER MIDDLEWARE", req.user)
    next();
  }
}

module.exports = {
  requireUser,
};