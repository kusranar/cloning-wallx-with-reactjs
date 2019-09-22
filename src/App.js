import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/Home';
import Account from './pages/Account';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" component={Account} />
          <Route path="/wallet" component={Wallet} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
