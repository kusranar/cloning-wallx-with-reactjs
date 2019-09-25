import React, { Component } from 'react';
import {getAccountByCif} from './../services/Account';
import TableContent from '../components/TableContent';


export default class Account extends Component {
    constructor() {
        super();
        this.state = {
            accounts : {}
        }
    }

    componentDidMount(){
        getAccountByCif(sessionStorage.getItem('token'))
            .then(res => {
                if(res.data.responseCode === "01"){
                    this.setState({accounts: res.data.data})
                }
            })
    }

    render() {
        return (
            <TableContent data={this.state.accounts} update={(e) => this.componentDidMount()} information={'Account'}/>
        )
    }
};