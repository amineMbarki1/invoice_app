'use strict';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: 'config/.env' });

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_LOCAL_URI)
    .then((con) => {
      console.log(`Connectd To MongoDB with host : ${con.connection.host}`);
    })
    .catch((error) => console.error(error));
};

module.exports = connectDB;
