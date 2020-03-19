import React from "react";
import API from "../utils/API";

import MUIDataTable from "mui-datatables";
import { TableCell, TableRow } from "@material-ui/core";



export class GlobalTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.get(),
        //     1000
        // );
        this.get()
    }

    get = async () => {
        let temp = [];
        let {data} = await API.get_loans(localStorage.getItem("token"));
        for (let i = 0; i < data.loans.length; i++) {
            temp.push([i, data.loans[i].demandeur, data.loans[i].montant, data.loans[i].taux, data.loans[i].duree, data.loans[i].dateExp]);
        }
        this.setState({rows: temp});
    };

    render() {
        const columns = ["n°", "Demandeur", "Somme", "Durée", "Taux", "Somme dûe", "Expire dans"];

        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            selectableRows: 'none',
            expandableRows: true,
            expandableRowsOnClick: true,
            renderExpandableRow: () => (
                <TableRow>
                    <TableCell />
                    <TableCell colSpan={3}>
                        <h4>D'autres infos</h4>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                </TableRow>
            )
        };

        return (
            <div className="globalTable">
                <MUIDataTable
                    title={"Marché des prêts"}
                    data={this.state.rows}
                    columns={columns}
                    options={options}
                />
            </div>
        );
    }
}
