import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { Person } from '../models/Person';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DataTable() {
    const [persons, setPersons] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllPersons();
        for (let person of persons) {
            let row = createData(person.name, person.gender, person.nationality, person.probability);
        }
    }, [])

    const getAllPersons = async () => {
        await axios.get('http://localhost:3001/graphql')
            .then(res => {
                setPersons(res.data);
            }).catch(error => {
                let errorMsg = 'Error...';

                // if (error.response) {
                //     errorMsg = `${error.response.statusText} (${error.response.status})`;
                // } else {
                //     errorMsg = error.message;
                // }

                // console.log("Error: ", errorMsg);
                // displaySnackbar(errorMsg, 'error');
                // setTimeout(() => {
                //     initSnackbar();
                // }, 2500);
            })
    }

    function createData(
        name: string,
        gender: string,
        nationality: string,
        probability: string,
    ) {
        return { name, gender, nationality, probability };
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
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
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} 