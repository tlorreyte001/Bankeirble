
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { createChainedFunction } from '@material-ui/core';

import APIBC from '../utils/APIBlockchain';
import API from '../utils/API';


export class HistoryTable extends React.Component{
  state={
    page: 0,
    setPage: 0,
    rowsPerPage: 10,
    setRowsPerPage: 10,

    Data:[{
      preteur:'',
      duration:'',
      taux:'',
      etat:'',
      montant:'',
  }]
  }

  async componentDidMount() {
    this.getData();
  };

  getData = async () => {

    const tempData = [];
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
        obj.duration = contract.duration;
        obj.taux = contract.rate;
        obj.montant = contract.totalAmount;


        tempData.push(obj);
        
      } 

        this.setState(state => (state.Data = tempData, state));
      } catch(e) {
        console.log(e)
    }
    }

  render(){
    const columns = [

    { id: 'preteur', label: 'Preteurs', minWidth: 170 },
      { id: 'duration', label: 'Duration', minWidth: 100 },
      {
        id: 'etat',
        label: 'État',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString(),
      },

        {
        id: 'taux',
        label: 'Taux',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
      },
      {
        id: 'montant',
        label: 'Montant',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString(),
      },

    ];

    function createData(preteur, duration, etat, taux, montant) {
      taux = taux / 100 .toString() + " %";
      montant = montant / 100 .toString() + " €";
      duration = duration .toString() + " mois"

      return { preteur, duration, etat,taux, montant };
    }

    function createRows(Data){
      const rows =[];
      for (let dataPerRow of Data) {
        rows.push( createData(dataPerRow.preteur, dataPerRow.duration, 'En cours', dataPerRow.taux, dataPerRow.montant));
      }
      return rows;
    }

    const useStyles = makeStyles({
      root: {
        width: '100%',
      },
      container: {
        maxHeight: 440,
      },
    });

      const handleChangePage = (event, newPage) => {
        this.state.setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        this.state.setRowsPerPage(+event.target.value);
        this.state.setPage(0);
      };

      return (
        <Paper className={useStyles.root}>
          <TableContainer className={useStyles.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {createRows(this.state.Data).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={createRows(this.state.Data).length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      );
    }
  }

export default HistoryTable;