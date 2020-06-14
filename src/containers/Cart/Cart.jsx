import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';


function Cart (props)  {

    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }

    useEffect(() => {
        if (productId) {
          dispatch(addToCart(productId, qty));
        }
      }, []);
      
    return (
        <div className="cart">
            <div className="cart-list">
            <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {cartItems.length === 0 ? 
                    <div>
                        Cart is empty
                    </div>
                    :
                    cartItems.map(item => 
                        <li key={item.id}>
                    <div className="cart-image">
                        <img src={item.image_path} alt="product"/></div>
                        <div className="cart-name">
                        <div>
                            <Link to={"/products" + item.product}>
                            {item.name}
                            </Link>
                        </div>
                        <div>
                            Qty:
                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.stock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                            <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                Delete
                            </button>
                        </div>
                        </div>
                        <div className="cart-price">{item.price} EUR</div>
        
                    </li>)}
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                :
                { cartItems.reduce((a, c) => a + c.price * c.qty, 0)} EUR 
                </h3>
                <button className="button primary full-width" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                    Proceed to checkout
                </button>
            </div>
        </div>
    )
}

export default Cart
