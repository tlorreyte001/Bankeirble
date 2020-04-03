import React from "react";
import API from "../utils/API";

import MUIDataTable from "mui-datatables";
import {Button, TableCell, TableRow} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";



export class GlobalTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            open: false,
            error: false
        };
    }

    componentDidMount() {
        this.get();
    }

    accept = async (event) => {
        let {res} = await API.accept(
            localStorage.getItem("token"),
            event.target.offsetParent.id
        );
        console.log(res);
        this.handleToggle();
    };

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

    handleToggle = () => {
        this.setState({open: true});
        setTimeout(this.closeIt, 1000);
        this.get();
    };

    closeIt = () => {
        this.setState({open: false});
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
                            <Button className={"mx-auto mt-3"} onClick={this.accept} variant="contained"
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
                        zIndex: 1000,
                        color: '#fff',
                    }}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {error}
                <MUIDataTable
                    title={"Marché des prêts"}
                    data={this.state.rows}
                    columns={columns}
                    options={options}
                />
                <Button className={"mx-auto mt-3"} onClick={this.get} variant="contained" color="secondary" type="submit">
                    Rafraichir les prêts
                </Button>
            </div>
        );
    }
}
