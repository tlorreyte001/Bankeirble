//  c'est le constucteur du modele qui prend les variables
//  comme des variables
function TauxCalculateur(expiration, mensualité, reputation, nbPretEnCours, prix, x, y) {
    this.expiration = expiration;
    this.mensualité = mensualité;
    this.reputation = reputation;
    this.nbPretEnCours = nbPretEnCours;
    this.prix = prix;
    this.x = x;
    this.y = y;
}
// fonction de calcul du taux
// 
TauxCalculateur.prototype.calculeTaux = function () {
    var l = this.calculeCalibre();
    var taux = (1 - l) * this.x + l * this.y;
    return taux;
};

// fonction de calcul du calibre
//
TauxCalculateur.prototype.calculeCalibre = function () {
    var calibre = 0.35 * (1 - (this.expiration / 30)) + 0.25 * (this.mensualité / 12) + 0.25 * (1 - ((this.reputation + 50) / 100)) + 0.1 * (this.nbPretEnCours / 5) + 0.05 * this.prix / 700;
    return calibre;
};
module.exports = TauxCalculateur;