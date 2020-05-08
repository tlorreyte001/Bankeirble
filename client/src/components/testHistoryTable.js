import React from "react";
import API from "../utils/API";
import APIBC from "../utils/APIBlockchain";

import MUIDataTable from "mui-datatables";
import {Button, TableCell, TableRow} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import {PopUpForm} from "./PopUpForm";
import saveAs from "file-saver";



class TestHistoryTable extends React.Component {
    state={
        rows:[],
        data:[],
        infos: [],
        open: false,
        form: false,
        error: false,
        openPopUp: false,
        dataSelected : {
            preteur:'',
            duration:'',
            taux:'',
            etat:'',
            montant:'',
        },   
        
      }
    

    componentDidMount() {
        this.getData();
    }

    getData = async () => {

        const tempRows = [];
        try{
          const {contracts} = await APIBC.history(JSON.parse(localStorage.getItem("user")).pseudo);
    
    
          for (let contract of contracts) {
    
            let obj = {
              preteur:'',
              duration:'',
              taux:'',
              etat:'',
              montant:'',
            };
    
    
            obj.preteur = contract.lender;
            obj.duration = contract.duration + "mois";
            obj.taux = contract.rate/100 .toString() + " %";
            obj.montant = contract.totalAmount/100 .toString() + " €";
    
    
            tempRows.push(obj);
            
          } 
    
            this.setState(state => (state.rows = tempData, state));
          } catch(e) {
            console.log(e)
        }
    }

    // ---------------- PopUp functions ---------------- //

    handleClickOpen = (event) => {
        this.checkInfo();
        let data = this.state.data[event.target.offsetParent.id];
        this.setState(
            {dataSelected: data},
            () => {
                this.setState({openPopUp: true});
                console.log(this.state.dataSelected);
            });
    };

    handleClose = () => {
        this.setState({openPopUp: false});
        this.handleToggle();
    };

    // -------------- BackDrop Functions ---------------- //
    handleToggle = () => {
        this.setState({open: true});
        setTimeout(this.closeIt, 1000);
        this.get();
    };

    closeIt = () => {
        this.setState({open: false});
    };
    // -------------- ------------------ ---------------- //

   
    // -------------- -------------------- ---------------- //

    render() {
        const columns = [

            { id: 'preteur', label: 'Preteurs', minWidth: 170, options: {
                filter: false,
                sort: false,
            } },
            { id: 'duration', label: 'Duration', minWidth: 100, options: {
                filter: false,
                sort: false,
            } },
            {
            id: 'etat',
            label: 'État',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString(),
            options: {
                filter: false,
                sort: false,
            }
            },

            {
            id: 'taux',
            label: 'Taux',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
            options: {
                filter: false,
                sort: false,
            }
            },
            {
            id: 'montant',
            label: 'Montant',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString(),
            options: {
                filter: false,
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
                            <p>Nombres de Prêts en cours : <span style={gradient}>{rowData[8].nbCurrentLoans}</span></p>
                            <p>Taux de remboursement : <span style={gradient}>{rowData[8].percentage}%</span></p>
                            <p>Retard de paiment moyen : <span style={gradient}>{rowData[8].average} jours</span></p>
                            <p>Informations issues de la BlockChain</p>
                           
                        </TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                );
            }
        };

        let error = null;

        if (this.state.error){
            error = <Alert className={"mb-3"} severity="error">Une information fournie est incorrecte !</Alert>;
        }

        return (
            <div className="globalTable">
                <Backdrop open={this.state.open} transitionDuration={1000}
                          style={{
                              zIndex: 1500,
                              color: '#fff',
                          }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {error}
                <PopUpForm open={this.state.openPopUp} onClose={this.handleClose} data={this.state.dataSelected} form={this.state.form} Success={this.props.Success}/>
                <MUIDataTable
                    title={"Table Historique"}
                    data={this.state.rows}
                    columns={columns}
                    options={options}
                />
               
            </div>
        );
    }
}

export default TestHistoryTable;