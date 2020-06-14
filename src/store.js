import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './redux/reducers/userReducers';
import {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer} from './redux/reducers/productReducers'
import {cartReducer} from './redux/reducers/cartReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderDeleteReducer, orderListReducer } from './redux/reducers/orderReducer';
import { categorySaveReducer, categoryDeleteReducer, categoryListReducer, categoryDetailsReducer } from './redux/reducers/CategoryReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {cart: { cartItems, shipping: {}, payment: {} }, userSignin: { userInfo }};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    categorySave: categorySaveReducer,
    categoryDelete: categoryDeleteReducer,
    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList:  myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;