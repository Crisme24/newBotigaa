import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Product from './containers/Product/Product';
import Cart from './containers/Cart/Cart';

function App() {


  return (
    <div className="grid-container">
    <BrowserRouter>
    <Header/>
    <Switch>
    <Route path="/" component={Home} exact/>
    <Route path="/products/:id" component={Product} exact/>
    <Route path="/cart/:id" component={Cart} exact/>
    <footer className="footer">
      All right reserved.
    </footer>
    </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
