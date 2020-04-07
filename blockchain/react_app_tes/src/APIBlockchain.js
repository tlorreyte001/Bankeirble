//All functions to call the blockchain

export default {
    // /blockchain/loan
    loan: async function (pseudo) {
        await contract.methods.reputation(pseudo).call((err,result)=>{var reputation = result})
        await contract.methods.nbemprunts(pseudo).call((err,result)=>{var nbPretsEnCours=result})
        let resultTab = new Array()
        resultTab[0] = reputation
        resultTab[1] = nbPretsEnCours
        console.log("/blockchain/loan");
        return resultTab  //Tableau [reputation nbPretsEnCours]
    },

    // /blockchain/loanTable
    loanTable: async function(pseudoTable) {  //Tableau de pseudos en argument
        let loanTable = new Array();
        let loan = {pseudo:"", reputation: -1, nbPretsEnCours:-1} //On créer un objet qui correspondra à une case dans le tableau
        for (let j=0; j<pseudoTable.length; j++){
          await contract.methods.reputation(pseudoTable[j]).call((err,result)=>{loan.reputation = result})
          await contract.methods.nbemprunts(pseudoTable[j]).call((err,result)=>{loan.nbPretsEnCours=result})
          loan.pseudo = pseudoTable[j]
          //contract.methods.nbemprunts(pseudoTable[j]).call((err,result)=>{loan.nbPretsEnCours=result}).then(alert("Emprunts "+ loan.nbPretsEnCours))
          loanTable[j] = loan
        console.log("/blockchain/loanTable");
        return loanTable //Tableau d'objets "loan" [ [pseudo :<pseudo1>, reputation:<rep1>, nbPretsEnCours:<nb1>] [...] ...]
        //Pour avoir le pseudo premier objet par exemple: loanTable[0].pseudo
    },

    // /blockchain/addLoan
    addLoan: function (preteur,emprunteur,taux,echeance_totale,montant_total,date_reelle,id) {
        contract.methods.createContract3(date_reelle,id).send({ from : account1}).then(contract.methods.createContract1(taux,echeance_totale,montant_total).send({ from : account1}).then(contract.methods.createContract2(emprunteur,preteur).send({ from : account1}).then(contract.methods.increaseContract().send({ from : account1}))))
        console.log("/blockchain/addLoan");
    },

    // /blockchain/history
    history: function () {
        console.log("/blockchain/history");
    }
};



}
