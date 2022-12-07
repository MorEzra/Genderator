import React, { Component } from 'react';
import Search from '../../sub_components/Search';
import DataTable from '../../sub_components/DataTable';

export default class Layout extends Component {
    public render() {
        return (
            <div>
                <Search />
                <DataTable />
            </div>
        );
    }
} 