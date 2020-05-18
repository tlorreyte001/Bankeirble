
import React from 'react';


import APIBC from '../utils/APIBlockchain';
import API from '../utils/API';

import {PaymentButton} from './Payment/PaymentButton';

import MUIDataTable from "mui-datatables";
import {Button, TableCell, TableRow} from "@material-ui/core";




export class HistoryTable extends React.Component{

  state={
    rows:[],
    data:[{
        preteur:'',
        emprunteur:'',
        dateDebut:'',
        duree:'',
        taux:'',
        etat:'',
        montant:'',
        monthly:'',
        pastTransactions:'',
        futureTransactions:'',

    }],
    infos: [],
    open: false,
    form: false,
    error: false,
    openPopUp: false,
    // dataSelected : {
    //     preteur:'',
    //     duration:'',
    //     taux:'',
    //     etat:'',
    //     montant:'',
    // },   
    
  }

  async componentDidMount() {
    this.getData();
    this.getStatus();

  };

  getData = async () => {

    const tempData = [];
    try{
      const {contracts} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);

      for (let contract of contracts) {

        let monthly = 0;
        var startDate = contract.startingDate .toString();

        var year = startDate.substring(0, 4);
        var month = startDate.substring(4, 6);
        var day = startDate.substring(6, 8);

        startDate = day + '/' + month + '/' + year ;

        let obj = {
          preteur:'',
          emprunteur:'',
          dateDebut:'',
          duree:'',
          taux:'',
          etat:'',
          montant:'',
          monthly:'',
          pastTransactions:'',
        };


        obj.preteur = contract.lender;
        obj.emprunteur = contract.borrower;
        obj.dateDebut = startDate;
        obj.duree = contract.duration ;
        obj.taux = contract.rate/ 100 ;
        obj.montant = contract.totalAmount/ 100 ;
        obj.pastTransactions = contract.transactions;
        
        monthly = obj.montant * (1+0.01*obj.taux) / parseFloat(obj.duree);

        obj.monthly = monthly.toFixed(2) + " €";
        obj.montant = contract.totalAmount/ 100 .toString() + " €";
        obj.taux = contract.rate/ 100 .toString() + " %";
        obj.duree = contract.duration .toString() + " mois";

        if (contract.transactions.length == 0) {
          obj.etat = 'en cours';
        } else if(contract.transactions.length == parseFloat(contract.duration)) {
          obj.etat = 'terminé';          
        }

        tempData.push(obj);
        
      } 

        this.setState(state => (state.data = tempData, state));
      } catch(e) {
        console.log(e)
    }
    }

  
    getStatus = async () => {
      const tempData = [];


      try{
          const {contracts} = await APIBC.prevision(JSON.parse(localStorage.getItem("user")).pseudo);
          console.log('Prevision', contracts);

      for (let contract of contracts) {
        let obj = {
          futureTransactions:'',
        }

        obj.futureTransactions = contract.transactions ;
        console.log('OBG FutureTransactions',obj.futureTransactions);

        tempData.push(obj.futureTransactions);

      }
      this.setState(state => (state.data.futureTransactions = tempData, state));



      } catch(e){
          console.log(e);
      }

  }
  handleClickOpen = (event) => {
    this.checkInfo();
    let data = this.state.data[event.target.offsetParent.id];
    this.setState(
        {dataSelected: data},
        () => {
            this.setState({openPopUp: true});
        });
};


render(){
 

  const columns = [
  {
  name: "preteur",
  label: "Preteur",
  options: {
  filter: true,
  sort: true,
  }
  },
  {
  name: "emprunteur",
  label: "Emprunteur",
  options: {
  filter: true,
  sort: true,
  }
  },
  {
  name: "dateDebut",
  label: 'Date de début',
  options: {
      filter: true,
      sort: true,
  }
  },
  {
  name: "duree",
  label: "Durée",
  options: {
  filter: true,
  sort: false,
  }
  },
  
 
  {
  name: "montant",
  label: "Montant",
  options: {
  filter: true,
  sort: false,
  }
  },
  {
    name: "taux",
    label: "Taux",
    options: {
    filter: true,
    sort: false,
    }
  },

  {
    name: "monthly",
    label: "Par mois",
    options: {
    filter: true,
    sort: false,
    }
  },

  {
    name: "etat",
    label: "Etat",
    options: {
    filter: true,
    sort: false,
    }
  },

  ];



  const options = {
  filterType: "dropdown",
  responsive: "scroll",
  selectableRows: 'none',
  expandableRows: true,
  textLabels: {
      body: {
          noMatch: "Désolé, pas de prêt disponible",
          toolTip: "Trier",
          columnHeaderTooltip: column => `Trier par ${column.label}`
      },
      pagination: {
          next: "Page suivante",
          previous: "Page précédente",
          rowsPerPage: "Lignes par page:",
          displayRows: "sur",
      },
      toolbar: {
          search: "Rechercher",
          downloadCsv: "Télécharger CSV",
          print: "Imprimer",
          viewColumns: "Selectionner les colonnes",
          filterTable: "Filtrer le tableau",
      },
      filter: {
          all: "Tout",
          title: "FILTRES",
          reset: "REINITIALISER",
      },
      viewColumns: {
          title: "Colonnes à afficher",
          titleAria: "Colonnes à afficher",
      },
      selectedRows: {
          text: "Ligne(s) sélectionnée(s)",
          delete: "Supprimer",
          deleteAria: "Supprimer les lignes sélectionnées",
      },
  },
  expandableRowsOnClick: true,
  renderExpandableRow: (rowData, rowMeta) => {
      let gradient = {
          background: "linear-gradient(to right,#e0881d,#d36362)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",};

          return (
              <TableRow>
                  <TableCell/>
                  <TableCell colSpan={3}>
                      <h4>Utilisateur <span style={gradient}>{rowData[1]}</span></h4>
                      <p>Montant Totale:<span style={gradient}>{rowData[4]}</span> </p>
                      <p>Taux de remboursement:<span style={gradient}>{rowData[5]}</span> </p>
                      <p>Remboursement par mois:<span style={gradient}>{rowData[6]}</span> </p>                    
                      <p>faire une transaction <PaymentButton /> </p>
                      
                      
                  </TableCell>
                  <TableCell/>
                  <TableCell/>
                  <TableCell/>
                  <TableCell/>
              </TableRow>
          );
      }
};
return(
<div>
    <MUIDataTable
    title={"Tableau des Prêts"}
    data={this.state.data}
    columns={columns}
    options={options}
    />
</div>
)
}
}

export default HistoryTable;