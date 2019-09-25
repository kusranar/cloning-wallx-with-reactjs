import React, {Component} from 'react';
import {getWalletByCif} from './../services/Wallet';
import TableContent from '../components/TableContent';

export default class Wallet extends Component {
    constructor(){
        super();
        this.state = {
            wallets: {}
        }
    }

    componentDidMount(){
        getWalletByCif(sessionStorage.getItem('token'))
            .then(res => {
                if(res.data.responseCode === '01'){
                    this.setState({wallets: res.data.data});
                }
            })
    }
    
    render(){
        return(
            <TableContent data={this.state.wallets} update={(e) => this.componentDidMount()} information={'Wallet'}/>
        )
    }
}