const naturalUser = require("./naturalUser.js");
const wallet = require("./wallet.js");
const card = require("./card.js");

module.exports = function (app) {
    app.get('/check', naturalUser.check);
    app.post('/create', naturalUser.create);
    app.get('/wallet', wallet.get);
    app.post('/wallet/create', wallet.create);
}