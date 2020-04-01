const loans = require('./loans.js');

module.exports = function (app) {
    app.get('/nbRequest/:user', loans.nbRequest)
    app.post('/add', loans.add);
    app.get('/rate/:user', loans.rate);
    app.get('/table/:user', loans.get_all_available);
    app.put('/accept', loans.accept_loan);
    app.delete('/delete', loans.remove_loan);
    app.get('/contract/:user/:idLoan', loans.get_contract);
};
