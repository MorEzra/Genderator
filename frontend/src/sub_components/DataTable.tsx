import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Person } from '../models/Person';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#588CC6',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#ECF2F9',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const DataTable = ({ allNames }: any) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let tempRows: Person[] = [];

        for (let person of allNames) {
            let row: Person = createData(person.name, person.gender, person.nationality, person.probability);
            tempRows.push(row);
        }

        setRows(tempRows);
    }, [allNames])

    function createData(
        name: string,
        gender: string,
        nationality: string,
        probability: string,
    ): Person {
        return { name, gender, nationality, probability };
    }

    return (
        <div>
            {allNames.length > 0 ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Gender</StyledTableCell>
                                <StyledTableCell align="right">Nationality</StyledTableCell>
                                <StyledTableCell align="right">Probability</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.gender}</StyledTableCell>
                                    <StyledTableCell align="right">{row.nationality}</StyledTableCell>
                                    <StyledTableCell align="right">{row.probability}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <Alert severity='info'>No names were added yet</Alert>}
        </div>
    );
}

// Redux state and actions
const mapStateToProps: any = (state: any) => {
    return {
        allNames: state.allNamesForDisplay,
    }
};

export default connect(mapStateToProps)(DataTable);