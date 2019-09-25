import React, { Component } from 'react';
import {getTransactionByCif} from './../services/Transaction';
import TableContent from '../components/TableContent';


export default class Account extends Component {
    constructor() {
        super();
        this.state = {
            transactions: {}
        }
    }

    componentDidMount(){
        getTransactionByCif(sessionStorage.getItem('token'))
            .then(res => {
                if(res.data.responseCode === "01"){
                    this.setState({transactions: res.data.data})
                }
            })
    }

    render() {
        return (
            <TableContent data={this.state.transactions} update={(e) => this.componentDidMount()} information={'Transaction'}/>
        )
    }
};