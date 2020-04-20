//All functions to call the blockchain // ce json est créé après le migrate truffle et permet de récupérer l'adresse. On peut mettre l'adresse en dure à la ligne address lors du lancement de ganache sinon.
let Web3 = require('web3');
let web3 = new Web3('http://Localhost:7545');
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"a","type":"string"},{"internalType":"string","name":"b","type":"string"}],"name":"compareStrings","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_totalAmount","type":"uint256"}],"name":"createContract1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_borrower","type":"string"},{"internalType":"string","name":"_lender","type":"string"}],"name":"createContract2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"_currentDate","type":"int256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"createContract3","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"date1","type":"int256"},{"internalType":"int256","name":"date2","type":"int256"}],"name":"dateDiff","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_lender","type":"string"},{"internalType":"string","name":"_borrower","type":"string"}],"name":"existContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getBorrower","outputs":[{"internalType":"string","name":"_borrower","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getCurrentDate","outputs":[{"internalType":"int256","name":"_currentDate","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getDuration","outputs":[{"internalType":"uint256","name":"_duration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getId","outputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getLender","outputs":[{"internalType":"string","name":"_lender","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getNbTransaction","outputs":[{"internalType":"uint256","name":"_nbTransaction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getRemainingAmount","outputs":[{"internalType":"uint256","name":"_remainingAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getRemainingDuration","outputs":[{"internalType":"uint256","name":"_remainingDuration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getTheoricalDate","outputs":[{"internalType":"int256","name":"_theoricalDate","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getTotalAmount","outputs":[{"internalType":"uint256","name":"_totalAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getTransactionAmount","outputs":[{"internalType":"uint256","name":"_transactionAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"increaseTrans","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"nbLoans","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nbTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"reputation","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"contractNumber","type":"uint256"}],"name":"testContractUser","outputs":[{"internalType":"int256","name":"_value","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_sum","type":"uint256"}],"name":"transaction1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"int256","name":"_currentDate","type":"int256"}],"name":"transaction2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"usersContracts","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"lender","type":"string"},{"internalType":"string","name":"borrower","type":"string"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"int256","name":"currentDate","type":"int256"},{"internalType":"int256","name":"theoricalDate","type":"int256"},{"internalType":"uint256","name":"remainingDuration","type":"uint256"},{"internalType":"uint256","name":"remainingAmount","type":"uint256"},{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"view","type":"function"}];
const address = "0xE3B84Cd3c51d1339D28C9556b020089581E0Ee8B"; // adresse du smartcontract
let contract = new web3.eth.Contract(abi,address);
let account1; // adresse du compte faisant les call et transaction
web3.eth.getAccounts().then(e => {account1=e[0]; console.log(account1)});


export default {
    // /blockchain/loan Récupère le nombre de prêts en cours et la réputation d'un utilisateur
    loan: async function (pseudo) {
        let nbLoans = await contract.methods.nbLoans(pseudo).call((err,result)=>{return result;});
        let reputation = await contract.methods.reputation(pseudo).call((err,result)=>{return result;});
        return {nbLoans: nbLoans, reputation: reputation};
    },

    // /blockchain/transaction Ajoute une transaction à un contrat
    transaction: async function(contractId, transactionAmount, date) { // date : yyyymmdd
        let status = await contract.methods.transaction2(contractId, date).send({ from : account1}).then(contract.methods.transaction1(contractId, transactionAmount).send({ from : account1}).then(contract.methods.increaseTrans(contractId).send({ from : account1}))).then(result=>{return true;}).catch(err => {return false;});
        return status;
    },

    // /blockchain/loanTable Retourne la réputation et le nombre de prêt d'un tableau d'utilisateurs
    loanTable: async function (pseudoTable) {
        let loanTable = new Array();
        let loan = {pseudo:"", reputation: -5, nbCurrentLoans:-5}
        for (let j=0; j<pseudoTable.length; j++){
            await contract.methods.reputation(pseudoTable[j]).call((err,result)=>{loan.reputation = result})
            await contract.methods.nbLoans(pseudoTable[j]).call((err,result)=>{loan.nbCurrentLoans=result})
            loan.pseudo = pseudoTable[j];
            loanTable[j] = loan;
        }
        return loanTable;
    },

    // /blockchain/addLoan Ajoute un Contrat
    addLoan: async function (lender,borrower,rate,duration,totalAmount,currentDate,id) { // date = yyyymmdd
        let status = await contract.methods.createContract3(currentDate,id).send({ from : account1}).then(contract.methods.createContract1(rate,duration,totalAmount).send({ from : account1}).then(contract.methods.createContract2(borrower,lender).send({ from : account1}).then(contract.methods.increaseContract().send({ from : account1})))).then(result=>{return true;}).catch(err => {return false;});;
        return status;
    },

    // /blockchain/history Retourne les transactions passées
    history: async function (pseudo) {
        let history ={
            contracts:[]
        }
        let count = await contract.methods.getCount().call((err, result)=>{result=result;}).then(result=>{return result;});
        for(let i = 0; i<count; i++){
            history.contracts.push({
                contractId : await contract.methods.getId(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                rate: await contract.methods.getRate(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                totalAmount: await contract.methods.getTotalAmount(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                duration: await contract.methods.getDuration(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                lender: await contract.methods.getLender(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                borrower: await contract.methods.getBorrower(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                transactions: []
            });
            let result = await contract.methods.testContractUser(pseudo, 0).call((err, result)=>{result=result;}).then(result=>{return result;});
            let nbTransaction = await contract.methods.getNbTransaction(i).call((err,result)=>{result=result;}).then(result=>{return result;});
            nbTransaction = parseInt(nbTransaction,10)+1;
            if (result == 1){
                let borrower = await contract.methods.getBorrower(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                for (let transaction = 1; transaction<nbTransaction; transaction++){
                    console.log("transaction"+transaction);
                    history.contracts[i].transactions.push({
                        transactionId: transaction,
                        status:"lender",
                        transactionAmount: await contract.methods.getTransactionAmount(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        otherPseudo: borrower,
                        remainingAmount:await contract.methods.getRemainingAmount(i,transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        remainingDuration: await contract.methods.getRemainingDuration(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        currentDate: await contract.methods.getCurrentDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        thDate: await contract.methods.getTheoricalDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;})
                    });
                }
            }
            else if(result == 2){
                let lender = await contract.methods.getLender(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                for (let transaction = 1; transaction<nbTransaction; transaction++){
                    history.contracts[i].transactions.push({
                        transactionId: transaction,
                        status:"borrower",
                        transactionAmount: await contract.methods.getTransactionAmount(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        otherPseudo: lender,
                        remainingAmount:await contract.methods.getRemainingAmount(i,transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        remainingDuration: await contract.methods.getRemainingDuration(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        currentDate: await contract.methods.getCurrentDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                        thDate: await contract.methods.getTheoricalDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;})
                    });
                }
            }
        }
        return history;
    }
};
