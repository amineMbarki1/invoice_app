const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authMiddelware = require('./middlewares/authMiddleware');
const app = express();

// App config
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Load routes
const invoicesRoutes = require('./routes/invoiceRoutes');
app.use('/invoices', authMiddelware, invoicesRoutes);

const usersRoutes = require('./routes/userRoutes');
app.use('/users', usersRoutes);

//Load errorhandler middelware
const errorHandler = require('./middlewares/errorMiddleware');
app.use(errorHandler);

module.exports = app;
