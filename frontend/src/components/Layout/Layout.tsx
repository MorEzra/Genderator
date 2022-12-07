import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Search from '../../sub_components/Search';
import DataTable from '../../sub_components/DataTable';
import { Person } from '../../models/Person';

const Layout = ({ SetAllNames }: any) => {
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

                SetAllNames(data);
            }).catch(error => {
                console.log(error.response.statusText);
                
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

    return (
        <div>
            <Search getAllPersons={getAllPersons} />
            <DataTable />
        </div>
    );
}

// Redux state and actions
const mapStateToProps: any = (state: any) => {
    return {
        allNames: state.allNames,
    }
};

const mapDispatchToProps: any = (dispatch: any) => {
    return {
        SetAllNames: (data: Person[]) => dispatch({ type: "SetAllNames", payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);