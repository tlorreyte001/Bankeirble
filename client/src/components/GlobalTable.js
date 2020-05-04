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



export class GlobalTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            rows: [],
            pseudos: [],
            infos: [],
            open: false,
            form: false,
            error: false,
            openPopUp: false,
            dataSelected : {
                _id : "",
                amount: 0,
                nbMonths: 0,
                rate: "",
                expirationDate: new Date(),
                pseudo: ""
            },
            loanTable : []
        };
    }

    componentDidMount() {
        this.handleToggle();
    }

    get = async () => {
        let temp = [];
        let temp2 = [];
        let today = new Date().getTime() / 86400000;
        try {
            let {data} = await API.table(localStorage.getItem("token"));
            this.setState({data: data.loans});

            for (let i = 0; i < data.loans.length; i++) {
                temp2.push(data.loans[i].pseudo);
            }
            this.setState({pseudos: temp2});
            this.bLoanTable().then(() => {
                let infos = this.state.infos;
                for (let i = 0; i < data.loans.length; i++) {
                    // Calcul des différent montants
                    let finalAmount = Math.round(data.loans[i].amount * (1 + 0.01 * data.loans[i].rate) * 100) / 100;
                    let finalDiff = Math.round(finalAmount - data.loans[i].amount);

                    // Traitements sur la date
                    let end = new Date(data.loans[i].expirationDate).getTime() / 86400000;
                    let diffDate = new Number( end - today).toFixed(0);

                    temp.push([
                        i,
                        data.loans[i].pseudo,
                        data.loans[i].amount.toString() + " €",
                        data.loans[i].nbMonths + " mois",
                        data.loans[i].rate.toString() + " %",
                        finalAmount.toString() + " €",
                        finalDiff.toString() + " €",
                        diffDate.toString() + " jour(s)",
                        infos[i],
                        data.loans[i]._id
                    ]);
                }
                this.setState({rows: temp});
                console.log(this.state.rows);
            });

        } catch (error) {
            //if (error.response.status === 400){
            //    this.setState({error: true});
            //}
        }
    };

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
                    let blob = new Blob([resp.data], {type: "application/pdf;charset=utf-8"});
                    saveAs(blob, "Contrat.pdf");
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    delete = async (event) => {
        try {
            await API.delete(localStorage.getItem("token"), event.target.offsetParent.id);
        } catch (error) {
            console.error(error);
        }
    };

    // -------------- BlockChain Functions ---------------- //
    bLoanTable = async () => {
        let temp = await APIBC.loanTable(this.state.pseudos);
        let temp2 = [];
        let result = []
        for (let i = 0; i < this.state.pseudos.length; i++){
            temp2.push(await APIBC.refundCaracts(this.state.pseudos[i]));
            result[i] = {
                ...temp[i],
                ...temp2[i],
            };
        }
        console.log(result);
        await this.setState({infos: result});
    };
    // -------------- -------------------- ---------------- //

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
                name: "Gain final",
                label: "Gain final",
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
                name: "infos",
                label: "infos",
                options: {
                    filter: false,
                    sort: true,
                    display: false
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
                            <Button className={"mx-auto mt-3"} onClick={this.handleClickOpen} variant="contained"
                                    color="secondary" type="submit" id={rowData[0]} >
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
                <PopUpForm open={this.state.openPopUp} onClose={this.handleClose} data={this.state.dataSelected} form={this.state.form} Success={this.props.Success}/>
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
