const app = require('./app');

//settting
app.set('port', process.env.PORT  || 3000);


//starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ${3000}');
    return;
});


module.exports = app;