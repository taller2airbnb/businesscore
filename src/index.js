const express = require('express');
const app = express();
const morgan = require('morgan');

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
app.use(require('./routes/index'));