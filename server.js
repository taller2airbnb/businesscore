const app = require('./app');

//settting
app.set('port', process.env.PORT  || 3000);


//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ${3000}');
    return;
});

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
app.use(require('./src/routes/images'));


module.exports = app;