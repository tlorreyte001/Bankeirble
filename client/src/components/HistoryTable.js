import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


class HistoryTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        pseudos: [],
        date : [],
        rows: [],
        etat: [],
        taux:[],
        montant:[],
        open: false,
        form: false,
        error: false,
        dataSelected : [],
        loanTable : []
    };
}


  render(){
const columns = [
  { id: 'pseudo', label: 'Pseudos', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
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

function createData(pseudo, date, etat, taux, montant) {
//   const density = etat / montant;
  return { pseudo, date, etat,taux, montant };
}

const rows = [
  createData('X', '12/03/2020', 'En cours', '3.75%', '700 €'),
  createData('Y', '15/04/2020', 'En cours','3.75%', '350 €'),
  createData('I', '10/10/2019', 'Terminé','3.75%', '120 €'),
  createData('U', '15/06/2019', 'Terminé','3.75%', '206 €'),
  createData('C', '03/03/2019', 'Terminé','3.75%', '390 €'),
  
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper classpseudo={classes.root}>
      <TableContainer classpseudo={classes.container}>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
}

export default HistoryTable;