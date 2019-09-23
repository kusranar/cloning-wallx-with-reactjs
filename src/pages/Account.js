import React, { Component } from 'react';
import * as accountService from './../services/Account';
import TableContent from '../components/TableContent';


export default class Account extends Component {
    constructor() {
        super();
        this.state = {
            account : {}
        }
    }

    componentDidMount(){
        accountService.getAccountByCif(sessionStorage.getItem('token'))
            .then(res => {
                if(res.data.responseCode === "01"){
                    this.setState({account: res.data.data})
                }
            })
    }

    render() {
        return (
            <TableContent data={this.state.account} update={(e) => this.componentDidMount()} information={'account'}/>
        )
    }
};