import React from 'react';
import './App.css';
import Store from './pages/Store';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Order from './pages/Order';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router >
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Store />
          </Route>
          <Route path='/animal/:id'>
            <Details/>
          </Route>
          <Route path='/checkout/:id'>
            <Checkout />
          </Route>
          <Route path='/order/:id'>
            <Order />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
