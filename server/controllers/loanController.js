const loans = require('./loans.js');

module.exports = function (app) {
    app.get('/nbRequest', loans.nbRequest);
    app.post('/add', loans.add);
    app.get('/rate', loans.rate);
    app.get('/table', loans.get_all_available);
    app.put('/accept', loans.accept_loan);
    app.delete('/delete', loans.remove_loan);
    app.get('/contract', loans.get_contract);
    app.post('/generateContract', prets.generateContract);
};
