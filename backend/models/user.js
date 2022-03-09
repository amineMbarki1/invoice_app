'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      reuired: [true, 'Please provide a name'],
      maxLength: [30, 'Please Provide a valid Name'],
    },
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Provide an email'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      minLength: [6, 'Password must be at least 6 characters'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//   expiresIn: process.env.JWT_EXPIRES_IN,
// });
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

module.exports = mongoose.model('User', userSchema);
