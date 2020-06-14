import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_ERROR, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_ERROR, PRODUCT_DELETE_ERROR, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCES} from '../types'
import {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_ERROR} from '../types'

function productListReducer(state= {products: []}, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
            case PRODUCT_LIST_ERROR:
                return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productDetailsReducer(state= {product: []}, action) {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload};
            case PRODUCT_DETAILS_ERROR:
                return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productSaveReducer(state = { product: {} }, action) {

    switch (action.type) {
      case PRODUCT_SAVE_REQUEST:
        return { loading: true };
      case PRODUCT_SAVE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_SAVE_ERROR:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
  }

  function productDeleteReducer(state = { product: {} }, action) {

    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case PRODUCT_DELETE_SUCCES:
        return { loading: false, product: action.payload, success: true };
      case PRODUCT_DELETE_ERROR:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
  }

export {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer};