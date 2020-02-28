const prets = require('./prets.js');

module.exports = function (app) {
    app.post('/create_loan',prets.create);
    app.post('/get_loan',prets.get);
}