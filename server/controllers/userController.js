const account = require('./account.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
};