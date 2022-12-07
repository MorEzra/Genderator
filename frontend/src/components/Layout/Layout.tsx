import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Search from '../../sub_components/Search';
import DataTable from '../../sub_components/DataTable';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Person } from '../../models/Person';
import Footer from '../../sub_components/footer';

const Layout = ({ setAllNames, toggleIsShowSnacknar, setSnackbarMessage, setSnackbarSeverity, isShowSnackbar, snackbarMessage, snackbarSeverity }: any) => {
    useEffect(() => {
        getAllPersons();
    }, [])

    const getAllPersons = async () => {
        await axios.post('http://localhost:3001/graphql', {
            query: `{getNames{
            name
            gender
            nationality
            probability}}`})
            .then(res => {
                let data = res.data.data.getNames;

                setAllNames(data);
            }).catch(error => {
                let errorMsg = `${error.response.statusText} (${error.response.status})`;

                console.log("Error: ", errorMsg);
                console.log("GraphQL error: ", error.response.data.errors[0]);
                
                displaySnackbar(errorMsg, 'error');
                setTimeout(() => {
                    initSnackbar();
                }, 2500);
            })
    }

    const displaySnackbar = (message: string, severity: string) => {
        toggleIsShowSnacknar();
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    }

    const initSnackbar = () => {
        toggleIsShowSnacknar();
        setSnackbarMessage('');
        setSnackbarSeverity('error');
    }

    return (
        <Container maxWidth="lg">
            <Search getAllPersons={getAllPersons} displaySnackbar={displaySnackbar} initSnackbar={initSnackbar} />
            <DataTable />
            <Footer/>

            {/* snackbar for error messages */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isShowSnackbar}
            ><Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </Container>
    );
}

// Redux state and actions
const mapStateToProps: any = (state: any) => {
    return {
        allNames: state.allNames,
        isShowSnackbar: state.isShowSnackbar,
        snackbarMessage: state.snackbarMessage,
        snackbarSeverity: state.snackbarSeverity
    }
};

const mapDispatchToProps: any = (dispatch: any) => {
    return {
        setAllNames: (data: Person[]) => dispatch({ type: "setAllNames", payload: data }),
        toggleIsShowSnacknar: () => dispatch({ type: "toggleIsShowSnackbar" }),
        setSnackbarMessage: (error: any) => dispatch({ type: "setSnackbarMessage", payload: error }),
        setSnackbarSeverity: (severity: string) => dispatch({ type: "setSnackbarSeverity", payload: severity }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);