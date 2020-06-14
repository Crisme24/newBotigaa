import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_ERROR, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_ERROR, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS, CATEGORY_SAVE_ERROR, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCES, CATEGORY_DELETE_ERROR } from "../types";

function categoryListReducer(state= {categories: []}, action) {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return {loading: true, categories: []};
        case CATEGORY_LIST_SUCCESS:
            return {loading: false, categories: action.payload};
            case CATEGORY_LIST_ERROR:
                return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function categoryDetailsReducer(state= {category: []}, action) {
    switch (action.type) {
        case CATEGORY_DETAILS_REQUEST:
            return {loading: true};
        case CATEGORY_DETAILS_SUCCESS:
            return {loading: false, category: action.payload};
            case CATEGORY_DETAILS_ERROR:
                return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function categorySaveReducer(state = {}, action) {

    switch (action.type) {
      case CATEGORY_SAVE_REQUEST:
        return { loading: true };
      case CATEGORY_SAVE_SUCCESS:
        return { loading: false, success: true, category: action.payload };
      case CATEGORY_SAVE_ERROR:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
  }

  function categoryDeleteReducer(state = {}, action) {

    switch (action.type) {
      case CATEGORY_DELETE_REQUEST:
        return { loading: true };
      case CATEGORY_DELETE_SUCCES:
        return { loading: false, category: action.payload, success: true };
      case CATEGORY_DELETE_ERROR:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
  }

export {categoryListReducer, categoryDetailsReducer, categorySaveReducer, categoryDeleteReducer};