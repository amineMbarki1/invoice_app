'use strict';
const HTTPError = require('../utils/httpError');
const User = require('../models/user');

exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json({
      success: true,
      user,
      token: user.generateToken(),
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new HTTPError(400, 'Please provide an Email and password'));
  try {
    const user = await User.findOne({ email });
    if (!user) throw new HTTPError(404, 'No user was found with this email');
    //  Checking if passowrds match
    if (!(await user.comparePasswords(`${password}`))) throw new HTTPError(401, 'Verify Email and Password');
    res.json({
      user,
      token: user.generateToken(),
    });
  } catch (error) {
    next(error);
  }
};
