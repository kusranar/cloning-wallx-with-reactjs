import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#DC143C'}}>
                <Link className="navbar-brand" to="/dashboard">WallX</Link>
                <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/account" className="nav-link">Account</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/wallet" className="nav-link">Wallet</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transaction" className="nav-link">Transaction</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}