import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const routing = (
    <Router>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" component={Dashboard} />
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
