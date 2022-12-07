import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Person } from '../models/Person';

const Search = ({ allNames, SetAllNamesForDisplay }: any) => {
    const [name, setName] = useState('');

    const handleClick = () => {
        if (name.trim().length > 0) {
            let filteredName = allNames.filter((n: Person) => n.name == name);

            if (filteredName.length > 0) {
                SetAllNamesForDisplay(filteredName);
            } else {
                getAllPersonsByName(name);
            }
        }
        else {
            SetAllNamesForDisplay(allNames);
        }
    }

    const onTagsChange = (event: any, values: any) => {
        setName(values);
    }

    const getAllPersonsByName = async (name: string) => {
        await axios.post('http://localhost:3001/graphql', {
            query: `{getDataByName(name:"${name}") {
                name
                gender
                nationality
                probability
            }}`})
            .then(res => {
                let data = res.data.data.getDataByName;

                SetAllNamesForDisplay([data]);
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

    return (
        <div>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={allNames.map((option: Person) => option.name)}
                onChange={onTagsChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search name"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
            />
            <Button variant="contained" onClick={handleClick}>Search</Button>
        </div>
    );
}

// Redux state and actions
const mapStateToProps: any = (state: any) => {
    return {
        allNames: state.allNames,
        allNamesForDisplay: state.allNamesForDisplay,
    }
};

const mapDispatchToProps: any = (dispatch: any) => {
    return {
        SetAllNamesForDisplay: (data: any) => dispatch({ type: "SetAllNamesForDisplay", payload: data }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);