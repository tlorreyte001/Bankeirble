export default {

    rate: function (expiration, mensualité, reputation, nbPretEnCours, prix) {
        // Paramètres
        let x = 3;
        let y = 6;

        //Date
        let dateActuelle = new Date(Date.now());
        let joursExpiration = Math.round((expiration.getTime() - dateActuelle.getTime()) / (8.64 * Math.pow(10, 7)));

        // Calcul du calibre
        let calibre = 0.35 * (1 - (joursExpiration / 30)) + 0.25 * (mensualité / 12) + 0.25 * (1 - ((reputation + 50) / 100)) + 0.1 * (nbPretEnCours / 5) + 0.05 * prix / 700;

        // Calcul du taux
        let taux = (1 - calibre) * x + calibre * y;

        // Arrondi
        taux = Math.round((taux*100))/100;

        return taux;
    },

}