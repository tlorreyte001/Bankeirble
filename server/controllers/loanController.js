const prets = require('./prets.js');

module.exports = function (app) {
    app.post('/add',prets.create);
}