import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_ERROR, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_ERROR, PRODUCT_SAVE_SUCCESS, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCES, PRODUCT_DELETE_ERROR } from "../types"
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_ERROR } from "../types"
import {API_URL} from '../../api-config'


const listProducts = () => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST});
        const { data } = await axios.get(API_URL + '/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_ERROR, payload: error.message})
    }
}

const detailsProduct = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: id});
        const {data} = await axios.get(API_URL + '/products/' + id);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_ERROR, payload: error.message})
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const { userSignin: { userInfo } } = getState();
      if (!product.id) {
        const { data } = await axios.post(API_URL + '/products', product, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put(API_URL + '/products/' + product.id, product, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
  
    } catch (error) {
  
      dispatch({ type: PRODUCT_SAVE_ERROR, payload: error.message });
    }
  }

  const deleteProdcut = (productId) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete(API_URL + "/products/" + productId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: PRODUCT_DELETE_SUCCES, payload: data, success: true });
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_ERROR, payload: error.message });
  
    }
  }

 

export {listProducts, detailsProduct, saveProduct, deleteProdcut}