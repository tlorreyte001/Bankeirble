//All functions to call the blockchain // ce json est créé après le migrate truffle et permet de récupérer l'adresse. On peut mettre l'adresse en dure à la ligne address lors du lancement de ganache sinon.
let Web3 = require('web3');
let web3 = new Web3('http://86.234.213.17/blockchain');
const abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"internalType":"string","name":"a","type":"string"},{"internalType":"string","name":"b","type":"string"}],"name":"compareStrings","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_totalAmount","type":"uint256"}],"name":"createContract1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_borrower","type":"string"},{"internalType":"string","name":"_lender","type":"string"}],"name":"createContract2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"int256","name":"_currentDate","type":"int256"},{"internalType":"string","name":"_id","type":"string"}],"name":"createContract3","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"int256","name":"date1","type":"int256"},{"internalType":"int256","name":"date2","type":"int256"}],"name":"dateDiff","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"_lender","type":"string"},{"internalType":"string","name":"_borrower","type":"string"}],"name":"existContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getBorrower","outputs":[{"internalType":"string","name":"_borrower","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"_id","type":"string"}],"name":"getContractNumber","outputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getCurrentDate","outputs":[{"internalType":"int256","name":"_currentDate","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"getDelayAverage","outputs":[{"internalType":"int256","name":"average","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getDuration","outputs":[{"internalType":"uint256","name":"_duration","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"_id","type":"string"}],"name":"getHash","outputs":[{"internalType":"string","name":"_hash","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getId","outputs":[{"internalType":"string","name":"_id","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getLender","outputs":[{"internalType":"string","name":"_lender","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getNbTransaction","outputs":[{"internalType":"uint256","name":"_nbTransaction","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"getRefundRate","outputs":[{"internalType":"uint256","name":"percentage","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getRemainingAmount","outputs":[{"internalType":"uint256","name":"_remainingAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getRemainingDuration","outputs":[{"internalType":"uint256","name":"_remainingDuration","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getStatus","outputs":[{"internalType":"bool","name":"_status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getTheoricalDate","outputs":[{"internalType":"int256","name":"_theoricalDate","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getTotalAmount","outputs":[{"internalType":"uint256","name":"_totalAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getTransactionAmount","outputs":[{"internalType":"uint256","name":"_transactionAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"hash","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"increaseContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"contractNumber","type":"uint256"}],"name":"increaseTrans","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"nbLoans","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nbTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"reputation","outputs":[{"internalType":"int256","name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_id","type":"string"},{"internalType":"string","name":"_hash","type":"string"}],"name":"setHash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"contractNumber","type":"uint256"}],"name":"testContractUser","outputs":[{"internalType":"int256","name":"_value","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"contractNumber","type":"uint256"},{"internalType":"uint256","name":"_sum","type":"uint256"}],"name":"transaction1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"contractNumber","type":"uint256"},{"internalType":"int256","name":"_currentDate","type":"int256"}],"name":"transaction2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"usersContracts","outputs":[{"internalType":"string","name":"id","type":"string"},{"internalType":"string","name":"lender","type":"string"},{"internalType":"string","name":"borrower","type":"string"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"int256","name":"currentDate","type":"int256"},{"internalType":"int256","name":"theoricalDate","type":"int256"},{"internalType":"uint256","name":"remainingDuration","type":"uint256"},{"internalType":"uint256","name":"remainingAmount","type":"uint256"},{"internalType":"bool","name":"status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]

const address = "0xCfEB869F69431e42cdB54A4F4f105C19C080A601"; // adresse du smartcontract
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

    // /blockchain/refundCaracts Récupère le taux de remboursement et le nombre moyen de jours de retards d'un utilisateur
    refundCaracts: async function (pseudo) {
        let percentageRefund = await contract.methods.getRefundRate(pseudo).call((err,result)=>{return result;});
        let averageDelay = await contract.methods.getDelayAverage(pseudo).call((err,result)=>{return result;});
        return {percentage: percentageRefund, average: averageDelay};
    },

    // /blockchain/setHash Met le hash du contrat avec l'id donné à jour
    setHash: async function (id,hash) {
        let hash = await contract.methods.setHash(id,hash).send({ from : account1});
    },

    // /blockchain/getHash Renvoie le hash du contrat avec l'id donné en paramètres
    getHash: async function (id) {
        let hash = await contract.methods.getHash(id).call((err,result)=>{return result;});
        return hash;
    },

    // /blockchain/transaction Ajoute une transaction à un contrat
    transaction: async function(contractId, transactionAmount, date) { // date : yyyymmdd
        let status = await contract.methods.transaction2(contractId, date).send({ from : account1}).then(contract.methods.transaction1(contractId, transactionAmount).send({ from : account1}).then(contract.methods.increaseTrans(contractId).send({ from : account1}))).then(result=>{return true;}).catch(err => {return false;});
        return status;
    },

    // /blockchain/loanTable Retourne la réputation et le nombre de prêt d'un tableau d'utilisateurs
    loanTable: async function (pseudoTable) {
        let loanTable = new Array();
         for (let j=0; j<pseudoTable.length; j++){
             loanTable.push({
             reputation : await contract.methods.reputation(pseudoTable[j]).call((err,result)=>{result=result;}).then(result=>{return result;}),
             nbCurrentLoans : await contract.methods.nbLoans(pseudoTable[j]).call((err,result)=>{result=result;}).then(result=>{return result;}),
             pseudo : pseudoTable[j]
         })
       }
         return loanTable;
    },

    // /blockchain/addLoan Ajoute un Contrat
    addLoan: async function (lender,borrower,rate,duration,totalAmount,currentDate,id) { // date = yyyymmdd
        let status = await contract.methods.createContract3(currentDate,id).send({ from : account1}).then(contract.methods.createContract1(rate,duration,totalAmount).send({ from : account1}).then(contract.methods.createContract2(borrower,lender).send({ from : account1}).then(contract.methods.increaseContract().send({ from : account1})))).then(result=>{return true;}).catch(err => {return false;});;
        return status;
    },

    prevision: async function(pseudo){
        let prevision ={
        contracts:[]
        }
        let j=0;
        let count = await contract.methods.getCount().call((err, result)=>{result=result;}).then(result=>{return result;});
        for(let i = 0; i<count; i++){
            let result = await contract.methods.testContractUser(pseudo, i).call((err, result)=>{result=result;}).then(result=>{return result;});
            if (result!=0){
                await contract.methods.getTotalAmount(i).call((err, result)=>{result=result;}).then(result=>{console.log(result);})
                prevision.contracts.push({
                    contractId : await contract.methods.getId(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    rate: await contract.methods.getRate(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    totalAmount: await contract.methods.getTotalAmount(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    duration: await contract.methods.getDuration(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    lender: await contract.methods.getLender(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    borrower: await contract.methods.getBorrower(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    transactions: []
                });

                let nbTransaction = await contract.methods.getNbTransaction(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                nbTransaction = parseInt(nbTransaction,10);
                if (result == 1){
                    let borrower = await contract.methods.getBorrower(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                    let status = await contract.methods.getStatus(i, nbTransaction).call((err, result)=>{result=result;}).then(result=>{return result});
                    if (status){
                        let installment = parseInt(prevision.contracts[j].totalAmount,10)/parseInt(prevision.contracts[j].duration,10);
                        let remainingAmount = await contract.methods.getRemainingAmount(i,nbTransaction).call((err, result)=>{result=result;}).then(result=>{return result;});
                        if (remainingAmount==0){
                            remainingAmount = prevision.contracts[j].totalAmount;
                        }
                        let nbRemainingTransaction = parseInt(remainingAmount,10)/installment;
                        for (let transaction = 0; transaction<nbRemainingTransaction; transaction++){
                            prevision.contracts[j].transactions.push({
                                status:"lender",
                                transactionAmount: installment,
                                otherPseudo: borrower,
                                remainingAmount: remainingAmount-(transaction*installment),
                                remainingDuration: nbRemainingTransaction-transaction,
                            });
                        }
                    }
                    else {
                        prevision.contracts[j].transactions = false;
                    }

                }
                else if(result == 2){
                    let lender = await contract.methods.getLender(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                    let status = await contract.methods.getStatus(i, nbTransaction).call((err, result)=>{result=result;}).then(result=>{return result});
                    if (status){
                        let installment = parseInt(prevision.contracts[j].totalAmount,10)/parseInt(prevision.contracts[j].duration,10);
                        let remainingAmount = await contract.methods.getRemainingAmount(i,nbTransaction).call((err, result)=>{result=result;}).then(result=>{return result;});
                        if (remainingAmount==0){
                            remainingAmount = prevision.contracts[j].totalAmount;
                        }
                        let nbRemainingTransaction = parseInt(remainingAmount,10)/installment;
                        for (let transaction = 0; transaction<nbRemainingTransaction; transaction++){
                            prevision.contracts[j].transactions.push({
                                status:"borrower",
                                transactionAmount: installment,
                                otherPseudo: lender,
                                remainingAmount: remainingAmount-(transaction*installment),
                                remainingDuration: nbRemainingTransaction-i,
                            });
                        }
                    }
                    else {
                        prevision.contracts[j].transactions = false;
                    }
                }
                j++;
            }
        }
        return prevision;
    },

    // /blockchain/history Retourne les transactions passées
    history: async function (pseudo) {
        let history ={
            contracts:[]
        }
        let j=0;

        let count = await contract.methods.getCount().call((err, result)=>{result=result;}).then(result=>{return result;});
        for(let i = 0; i<count; i++){
            let result = await contract.methods.testContractUser(pseudo, i).call((err, result)=>{result=result;}).then(result=>{return result;});
            if (result!=0){
                history.contracts.push({
                    contractId : await contract.methods.getId(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    rate: await contract.methods.getRate(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    totalAmount: await contract.methods.getTotalAmount(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    duration: await contract.methods.getDuration(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    lender: await contract.methods.getLender(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    borrower: await contract.methods.getBorrower(i).call((err, result)=>{result=result;}).then(result=>{return result;}),
                    transactions: []
                });
                let nbTransaction = await contract.methods.getNbTransaction(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                nbTransaction = parseInt(nbTransaction,10);
                if (result == 1){
                    let borrower = await contract.methods.getBorrower(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                    for (let transaction = 0; transaction<nbTransaction; transaction++){
                        history.contracts[j].transactions.push({
                            transactionId: transaction,
                            status:"lender",
                            transactionAmount: await contract.methods.getTransactionAmount(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            otherPseudo: borrower,
                            remainingAmount:await contract.methods.getRemainingAmount(i,transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            remainingDuration: await contract.methods.getRemainingDuration(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            currentDate: await contract.methods.getCurrentDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            thDate: await contract.methods.getTheoricalDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            available: await contract.methods.getStatus(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;})
                        });
                    }
                }
                else if(result == 2){
                    let lender = await contract.methods.getLender(i).call((err,result)=>{result=result;}).then(result=>{return result;});
                    for (let transaction = 0; transaction<nbTransaction; transaction++){
                        history.contracts[j].transactions.push({
                            transactionId: transaction,
                            status:"borrower",
                            transactionAmount: await contract.methods.getTransactionAmount(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            otherPseudo: lender,
                            remainingAmount:await contract.methods.getRemainingAmount(i,transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            remainingDuration: await contract.methods.getRemainingDuration(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            currentDate: await contract.methods.getCurrentDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            thDate: await contract.methods.getTheoricalDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
                            available: await contract.methods.getStatus(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;})
                        });
                    }
                }
                j++;
            }
        }
        return history;
    }
};
