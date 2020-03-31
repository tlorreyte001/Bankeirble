const account = require('./account.js');

module.exports = function (app) {
    app.post('/signup',account.signup);
    app.post('/login',account.login);
    app.get('/checkInfo',account.checkInfo);
    app.put('/addInfo',account.addInfo);
};
