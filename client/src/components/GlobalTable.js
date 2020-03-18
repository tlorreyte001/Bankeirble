import React from "react";
import API from "../utils/API";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export class GlobalTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.get(),
            1000
        );
    }

    createData(n, demandeur, montant, taux, duree, dateExp){
        return {n, demandeur, montant, taux, duree, dateExp};
    };

    get = async () => {
        let temp = [];
        let {data} = await API.get_loans(localStorage.getItem("token"));
        console.log({data})
        for (let i = 0; i < data.loans.length; i++) {
            temp.push(this.createData(i, data.loans[i].demandeur, data.loans[i].montant, data.loans[i].taux, data.loans[i].duree, data.loans[i].dateExp));
        }
        this.setState({rows: temp});
    };

    render() {
        return (
            <div className="globalTable">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Marché des Prêts</TableCell>
                                <TableCell>Demandeur</TableCell>
                                <TableCell align="right">Somme</TableCell>
                                <TableCell align="right">Durée</TableCell>
                                <TableCell align="right">Taux</TableCell>
                                <TableCell align="right">Somme dûe</TableCell>
                                <TableCell align="right">Expire dans</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map(row => (
                                <TableRow key={row.n}>
                                    <TableCell component="th" scope="row">
                                        {row.n}
                                    </TableCell>
                                    <TableCell align="right">{row.demandeur}</TableCell>
                                    <TableCell align="right">{row.montant}</TableCell>
                                    <TableCell align="right">{row.duree}</TableCell>
                                    <TableCell align="right">{row.taux}</TableCell>
                                    <TableCell align="right">{row.du}</TableCell>
                                    <TableCell align="right">{row.dateExp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
