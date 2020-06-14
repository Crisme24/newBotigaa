import axios from 'axios'
import { API_URL } from '../../api-config'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../types';
import Cookie from 'js-cookie'

const addToCart = (id, qty) => async(dispatch, getState) => {
    try {
        const {data} = await axios.get(API_URL + '/products/' + id);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data.id,
                name: data.name,
                image_path: data.image_path,
                price: data.price,
                stock: data.stock,
                qty
            }
        });

        const {cart: {cartItems} } = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));

    } catch (error) {
        
    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart: {cartItems} } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data})
}

const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data})
}

export {addToCart, removeFromCart, saveShipping, savePayment}