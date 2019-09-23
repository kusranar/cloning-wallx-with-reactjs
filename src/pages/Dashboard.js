import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {getCustomerByCif} from './../services/Customer';
import Navbar from '../components/Navbar';
import CardProfile from '../components/CardProfile';
import Account from './Account';
import Wallet from './Wallet';
import Transaction from './Transaction';
import Home from './Home';


export default class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            customer: {}
        }
    }
    componentDidMount(){
        getCustomerByCif(sessionStorage.getItem('token'))
            .then(res => {
                if(res.data.responseCode === '01'){
                    this.setState({customer: res.data.data});
                }
            })
    }
    render() {
        return (
            <Router>
                <header>
                    <Navbar />
                </header>
                <main style={{ display: 'flex' }}>
                    <CardProfile customer={(this.props.location.state) ? this.props.location.state : this.state.customer} />
                    <Route path="/account" component={Account} />
                    <Route path="/wallet" component={Wallet} />
                    <Route path="/transaction" component={Transaction} />

                </main>
            </Router>
        )
    }
}