import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CardProfile from '../components/CardProfile';
import Account from './Account';
import Wallet from './Wallet';
import Transaction from './Transaction';
import Home from './Home';

function Dashboard() {
    return (
        <Router>
            <header>
                <Navbar />
            </header>
            <main style={{display: 'flex'}}>
                <CardProfile />
                <Route path="/account" component={Account} />
                <Route path="/wallet" component={Wallet} />
                <Route path="/transaction" component={Transaction} />
                
            </main>

        </Router>
    )
}

export default Dashboard;