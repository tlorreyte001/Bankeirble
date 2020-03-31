const prets = require('./prets.js');

module.exports = function (app) {
    app.post('/nb_demande', prets.nb_demandes);
    app.post('/add', prets.add);
    app.post('/get_all', prets.get_all);
    app.post('/get_all_available', prets.get_all_available);
    app.post('/get_by_user', prets.get_by_user);
    app.post('/accept_loan', prets.accept_loan);
    app.post('/remove_loan', prets.remove_loan);
};
