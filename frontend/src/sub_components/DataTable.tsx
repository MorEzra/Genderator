import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Person } from '../models/Person';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Nationality</TableCell>
                        <TableCell align="right">Probability</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.gender}</TableCell>
                            <TableCell align="right">{row.nationality}</TableCell>
                            <TableCell align="right">{row.probability}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Redux state and actions
const mapStateToProps: any = (state: any) => {
    return {
        allNames: state.allNamesForDisplay,
    }
};

export default connect(mapStateToProps)(DataTable);