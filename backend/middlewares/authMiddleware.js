const jwt = require('jsonwebtoken');

const HTTPError = require('../utils/httpError');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new HTTPError(401, 'Login to access this resource'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) throw new HTTPError(401, 'Invalid token');
    console.log(`${user.email} just logged in`);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
