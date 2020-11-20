const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();


//settting
app.set('port', process.env.PORT  || 3000);

//midleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));//only text, not files
app.use(express.json());


//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ${3000}');
});

//routes
app.use(require('./src/routes/index'));
app.use(require('./src/routes/user'));
app.use(require('./src/routes/profile'));
app.use(require('./src/routes/posting'));



