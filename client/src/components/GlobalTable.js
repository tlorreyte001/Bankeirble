import React from "react";
import API from "../utils/API";

import MUIDataTable from "mui-datatables";
import {Button, TableCell, TableRow} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import {PopUpForm} from "./PopUpForm";
import saveAs from "file-saver";



export class GlobalTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            open: false,
            form: false,
            error: false,
            openPopUp: false,
            _idSelected : ""
        };
    }

    componentDidMount() {
        this.get();
    }

    get = async () => {
        let temp = [];
        try {
            let {data} = await API.table(localStorage.getItem("token"));
            for (let i = 0; i < data.loans.length; i++) {
                temp.push([
                    i,
                    data.loans[i].pseudo,
                    data.loans[i].amount.toString() + " €",
                    data.loans[i].nbMonths + " mois",
                    data.loans[i].rate.toString() + " %",
                    (data.loans[i].amount * (1 + 0.01 * data.loans[i].rate)).toString() + " €",
                    data.loans[i].expirationDate,
                    data.loans[i]._id
                ]);
            }
            this.setState({rows: temp});
        } catch (error) {
            //if (error.response.status === 400){
            //    this.setState({error: true});
            //}
        }
    };

    // ---------------- PopUp functions ---------------- //

    handleClickOpen = (event) => {
        this.checkInfo();
        this.setState({_idSelected: event.target.offsetParent.id});
        this.setState({openPopUp: true});
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

    checkInfo = async () => {
        try {
            const {status} = await API.checkInfo(localStorage.getItem("token"));
            if (status === 200){
                this.setState({form: false});
            }
        } catch (error) {
            if (error.response.status === 402){
                this.setState({form: true});
            }
            else if (error.response.status === 400 || error.response.status === 401){
                console.log("error");
            }
        }
    };
    
    generateContract = async (event) => {
        try {
            await API.contract(localStorage.getItem("token"), event.target.offsetParent.id).then(
                resp=>{
                    var blob = new Blob([resp.data], {type: "application/pdf;charset=utf-8"});
                    saveAs(blob, "Contrat.pdf");
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const columns = [
            {
                name: "n°",
                label: "n°",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "Demandeur",
                label: "Demandeur",
                options: {
                    filter: false,
                    sort: false,
                }
            },
            {
                name: "Somme",
                label: "Somme",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "Durée",
                label: "Durée",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "Taux",
                label: "Taux",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "Somme dûe",
                label: "Somme dûe",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "Expire dans",
                label: "Expire dans",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "_id",
                label: "_id",
                options: {
                    filter: false,
                    sort: true,
                    display: false
                }
            }
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
                return (
                    <TableRow>
                        <TableCell/>
                        <TableCell colSpan={3}>
                            <h4>Infos user :</h4>
                            <Button className={"mx-auto mt-3"} onClick={this.handleClickOpen} variant="contained"
                                    color="secondary" type="submit" id={rowData[7]}>
                                Accepter
                            </Button>
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
                <PopUpForm open={this.state.openPopUp} onClose={this.handleClose} data={this.state._idSelected} form={this.state.form}/>
                <MUIDataTable
                    title={"Marché des prêts"}
                    data={this.state.rows}
                    columns={columns}
                    options={options}
                />
                <div className={"row mx-auto"}>
                    <Button className={"mt-3"} onClick={this.handleToggle} variant="contained" color="secondary" type="submit">
                        Rafraichir les prêts
                    </Button>
                </div>
            </div>
        );
    }
}
