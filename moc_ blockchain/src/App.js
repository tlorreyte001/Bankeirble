//import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import hist from './sangoku.png';
let Web3 = require('web3');
let web3 = new Web3('http://Localhost:7545');
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"a","type":"string"},{"internalType":"string","name":"b","type":"string"}],"name":"compareStrings","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_totalAmount","type":"uint256"}],"name":"createContract1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_borrower","type":"string"},{"internalType":"string","name":"_lender","type":"string"}],"name":"createContract2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"_currentDate","type":"int256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"createContract3","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"date1","type":"int256"},{"internalType":"int256","name":"date2","type":"int256"}],"name":"dateDiff","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_lender","type":"string"},{"internalType":"string","name":"_borrower","type":"string"}],"name":"existContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getBorrower","outputs":[{"internalType":"string","name":"_borrower","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"_count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getCurrentDate","outputs":[{"internalType":"int256","name":"_currentDate","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getDuration","outputs":[{"internalType":"uint256","name":"_duration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getId","outputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getLender","outputs":[{"internalType":"string","name":"_lender","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getNbTransaction","outputs":[{"internalType":"uint256","name":"_nbTransaction","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getRate","outputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getRemainingAmount","outputs":[{"internalType":"uint256","name":"_remainingAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getRemainingDuration","outputs":[{"internalType":"uint256","name":"_remainingDuration","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getStatus","outputs":[{"internalType":"bool","name":"_status","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getTheoricalDate","outputs":[{"internalType":"int256","name":"_theoricalDate","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"}],"name":"getTotalAmount","outputs":[{"internalType":"uint256","name":"_totalAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"contratNumber","type":"uint256"},{"internalType":"uint256","name":"transactionId","type":"uint256"}],"name":"getTransactionAmount","outputs":[{"internalType":"uint256","name":"_transactionAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"increaseTrans","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"nbLoans","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nbTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"}],"name":"reputation","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"contractNumber","type":"uint256"}],"name":"testContractUser","outputs":[{"internalType":"int256","name":"_value","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_sum","type":"uint256"}],"name":"transaction1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"int256","name":"_currentDate","type":"int256"}],"name":"transaction2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"usersContracts","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"lender","type":"string"},{"internalType":"string","name":"borrower","type":"string"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"totalAmount","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"int256","name":"currentDate","type":"int256"},{"internalType":"int256","name":"theoricalDate","type":"int256"},{"internalType":"uint256","name":"remainingDuration","type":"uint256"},{"internalType":"uint256","name":"remainingAmount","type":"uint256"},{"internalType":"bool","name":"status","type":"bool"}],"stateMutability":"view","type":"function"}];
const address = "0x9cf9521A873D7eEBb97343fecdcfAfD6d01752d3"; // adresse du smartcontract
let contract = new web3.eth.Contract(abi,address);
let account1; // adresse du compte faisant les call et transaction
web3.eth.getAccounts().then(e => {account1=e[0]; console.log(account1)});

class App extends Component {
  create(){
    let lender = prompt('lender')
    let borrower = prompt('borrower')
    let rate = prompt('rate')
    let duration = prompt('duration')
    let totalAmount = prompt('totalAmount')
    let currentDate  = prompt('Date')
    let id = prompt('id')
    contract.methods.createContract3(currentDate,id).send({ from : account1}).then(contract.methods.createContract1(rate,duration,totalAmount).send({ from : account1}).then(contract.methods.createContract2(borrower,lender).send({ from : account1}).then(contract.methods.increaseContract().send({ from : account1}))))
    alert("Contrat mis dans la blockchain Mr ")

  }

  async history(){
    let pseudo = prompt('pseudo');
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
      console.log(nbTransaction);
      if (result == 1){
        let borrower = await contract.methods.getBorrower(i).call((err,result)=>{result=result;}).then(result=>{return result;});
        console.log("test");
        await contract.methods.getStatus(i, 1).call((err, result)=>{result=result;}).then(result=>{console.log(result)});
        for (let transaction = 1; transaction<nbTransaction+1; transaction++){
          console.log("transaction"+transaction);
          history.contracts[i].transactions.push({
            transactionId: transaction,
            status:"lender",
            transactionAmount: await contract.methods.getTransactionAmount(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            otherPseudo: borrower,
            remainingAmount:await contract.methods.getRemainingAmount(i,transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            remainingDuration: await contract.methods.getRemainingDuration(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            currentDate: await contract.methods.getCurrentDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            thDate: await contract.methods.getTheoricalDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            status: await contract.methods.getStatus(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;})
          });
        }
      }
      else if(result == 2){
        let lender = await contract.methods.getLender(i).call((err,result)=>{result=result;}).then(result=>{return result;});
        for (let transaction = 1; transaction<nbTransaction+1; transaction++){
          history.contracts[i].transactions.push({
            transactionId: transaction,
            status:"borrower",
            transactionAmount: await contract.methods.getTransactionAmount(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            otherPseudo: lender,
            remainingAmount:await contract.methods.getRemainingAmount(i,transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            remainingDuration: await contract.methods.getRemainingDuration(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            currentDate: await contract.methods.getCurrentDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            thDate: await contract.methods.getTheoricalDate(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;}),
            status: await contract.methods.getStatus(i, transaction).call((err, result)=>{result=result;}).then(result=>{return result;})
          });
        }
      }
    }
    let transactionobj= JSON.parse(JSON.stringify(history));
    console.log(transactionobj);
  }

  async prevision(){
    let pseudo = prompt('pseudo');
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
            console.log(nbRemainingTransaction);
            for (let transaction = 1; transaction<nbRemainingTransaction+1; transaction++){
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
            let installment = prevision.contracts[i].totalAmount/prevision.contracts[i].duration;
            let remainingAmount = await contract.methods.getRemainingAmount(i,nbTransaction).call((err, result)=>{result=result;}).then(result=>{return result;});
            let nbRemainingTransaction = remainingAmount/installment;
            for (let transaction = 1; transaction<nbRemainingTransaction+1; transaction++){
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
    let transactionobj= JSON.parse(JSON.stringify(prevision));
    console.log(transactionobj);
  }

  transaction(){
    let id = prompt('id du contrat')
    let sum = prompt('sum de la transaction')
    let date = prompt('Date de la transaction')
    contract.methods.transaction2(id, date).send({ from : account1}).then(contract.methods.transaction1(id, sum).send({ from : account1}).then(contract.methods.increaseTrans(id).send({ from : account1})))
  }

  async nbLoans(){
    let pseudo = prompt('pseudo')
    contract.methods.nbLoans(pseudo).call((err,result)=>{alert("Vous avez actuellement fait " + result + " prêts")})
  }

  reputation(){
    let pseudo = prompt('pseudo')
    contract.methods.reputation(pseudo).call((err,result)=>{alert("Vous avez une réputation de " + result)})
  }

  async loanTable(){
    let number = prompt('Combien de pseudo dans le tableau?')
    let pseudoTable = new Array();
    let loanTable = new Array();
    let loan = {pseudo:"", reputation: -5, nbCurrentLoans:-5}
    let resume = ""
    for (let i=0; i<number; i++){
      pseudoTable[i] = prompt("Pseudo numéro " + i)
    }
    for (let j=0; j<pseudoTable.length; j++){
      await contract.methods.reputation(pseudoTable[j]).call((err,result)=>{loan.reputation = result})
      await contract.methods.nbemprunts(pseudoTable[j]).call((err,result)=>{loan.nbCurrentLoans=result})
      loan.pseudo = pseudoTable[j]
      //contract.methods.nbemprunts(pseudoTable[j]).call((err,result)=>{loan.nbLoansEnCours=result}).then(alert("Emprunts "+ loan.nbLoansEnCours))
      loanTable[j] = loan
      resume = resume  + "pseudo: " + loanTable[j].pseudo + " réputation: " + loanTable[j].reputation + " nbLoans: " + loanTable[j].nbCurrentLoans + "\n"
    }
    alert(resume)
  }

  render(){
  return (
    <div className="App">
      <h1> Salut à toi l'artiste </h1>
      <h2> Ici la tour de controle to Major Tom </h2>
      <div>
        <button color="primary" onClick={ ()=>this.create() }> createContract </button>
      </div>
      <div>
        <button color="primary" onClick={ ()=>this.nbLoans() }> Savoir mon number de prêt </button>
      </div>
      <div>
        <button color="primary" onClick={ ()=>this.reputation() }> Ma réputation </button>
      </div>
      <div>
        <button color="primary" onClick={ ()=>this.transaction() }> Faire une transaction </button>
      </div>
      <div>
        <button color="primary" onClick={ ()=>this.history() }> L'historique des transactions </button>
      </div>
      <div>
        <button color="primary" onClick={ ()=>this.prevision() }> Prévision des transactions </button>
      </div>
      <div>
        <button color="primary" onClick={ ()=>this.loanTable() }> Loan Table </button>
      </div>
      <img src={hist} />

    </div>
  );
}
}

export default App;
