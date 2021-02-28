const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();



//midleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //only text, not files
app.use(express.json());

//routes
app.use(require('./src/routes/index'));
app.use(require('./src/routes/user'));
app.use(require('./src/routes/profile'));
app.use(require('./src/routes/posting'));
app.use(require('./src/routes/booking'));
app.use(require('./src/routes/rating'));
app.use(require('./src/routes/wallet'));
app.use(require('./src/routes/comment'));
app.use(require('./src/routes/pushNotifications'));



module.exports = app;