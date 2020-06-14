import axios from 'axios'
import {API_URL2 } from '../../api-config'
import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_ERROR} from '../types';
import{ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS} from '../types';
import{ORDER_DETAILS_ERROR, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_ERROR} from '../types';
import{MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_ERROR} from '../types';
import{ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_ERROR, ORDER_DELETE_REQUEST} from '../types';
import{ORDER_DELETE_SUCCESS, ORDER_DELETE_ERROR } from '../types';

const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST, payload: order});
        const {userSignin : {userInfo}} = getState();
        const {data: {data: newOrder}} = await axios.post(API_URL2 + '/api/orders', order, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: newOrder})
    } catch (error) {
        dispatch({type: ORDER_CREATE_ERROR, payload: error.message})   
    }
}

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await axios.get(API_URL2 + "/api/orders/mine", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_ERROR, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await axios.get(API_URL2 + "/api/orders", {
      headers:
        { Authorization: 'Bearer ' + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_ERROR, payload: error.message });
  }
}

const detailsOrder = (orderId) => async(dispatch, getState) => {
   try {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    const {userSignin : {userInfo}} = getState();
    const {data} = await axios.get(API_URL2 + '/api/orders/' + orderId, {
        headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
    })
    dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
   } catch (error) {
    dispatch({type: ORDER_DETAILS_ERROR, payload: error.message})   
   }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
      const { userSignin: { userInfo } } = getState();
      const { data } = await axios.put(API_URL2 + "/api/orders/" + order._id + "/pay", paymentResult, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_PAY_ERROR, payload: error.message });
    }
  }

  const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
           const { data } = await axios.delete(API_URL2 + "/api/orders/" + orderId , {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data, success: true })
    } catch (error) {
      dispatch({ type: ORDER_DELETE_ERROR, payload: error.message });
    }
  }


export {createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder}