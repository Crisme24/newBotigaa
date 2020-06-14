import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home';
import Product from './containers/Product/Product';
import Cart from './containers/Cart/Cart';
import Signin from './components/User/Signin';
import Register from './components/User/Register';
import Profile from './components/User/Profile';
import AdminProduct from './components/Admin/AdminProduct';
import Shipping from './containers/Shipping/Shipping';
import Payment from './containers/Payment/Payment';
import PlaceOrder from './containers/PlaceOrder/PlaceOrder';
import Order from './containers/Order/Order';
import OrderScreen from './containers/Order/OrderScreen';
import { useSelector } from 'react-redux';
import AdminCategory from './components/Admin/AdminCategory';


function App() {

  const userSignin = useSelector(state => state.userSignin);
  console.log(userSignin)
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (

    <BrowserRouter>
   < div className="grid-container">  
   <header className="header">
      <div className="brand">
        <button onClick={openMenu}>
          &#9776;
        </button>
        <Link to="/">BOTIGAA</Link>
      </div>
      <div className="header-links">
            <a href="cart.html">Cart</a>
            {
              userInfo ? <Link to="/profile">{userInfo?.user?.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
            {userInfo && userInfo?.user?.role === 'isAdmin' && (
              <div className="dropdown">
                <a href="#"  >Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/categories">Categories</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
    
    <aside className="sidebar">
     <h3>Shopping Categories</h3>
  <button className="sidebar-close-button" onClick={closeMenu}>x</button>
  <ul className="categories">
    <li>
      <Link to="/category/dresses">Dresses</Link>
    </li>

    <li>
    <Link to="/category/swimwear">Swimwear</Link>
    </li>

  </ul>
</aside>
    <main className="main">
          <div className="content">
    
    <Route path="/register" component={Register} exact/>
    <Route path="/signin" component={Signin} exact/>
    <Route path="/profile" component={Profile} exact/>
    <Route path="/products" component={AdminProduct} exact/>
    <Route path="/categories" component={AdminCategory} exact/>
    <Route path="/orders" component={OrderScreen} exact/>
    <Route path="/shipping" component={Shipping} exact/>
    <Route path="/payment" component={Payment} exact/>
    <Route path="/placeorder" component={PlaceOrder} exact/>
    <Route path="/products/:id" component={Product} exact/>
    <Route path="/cart/:id" component={Cart} exact/>
    <Route path="/order/:id" component={Order} exact/>
    <Route path="/" component={Home} exact/>
    </div>
    </main>
    <footer className="footer">
    © 2020 JEIMY ALL RIGHTS RESERVED
    </footer>
    </div> 
    </BrowserRouter>
  );
}

export default App;
