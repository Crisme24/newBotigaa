import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_ERROR } from "../types"
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

export {listProducts, detailsProduct}