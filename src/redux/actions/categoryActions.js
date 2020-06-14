import axios from 'axios'
import {API_URL} from '../../api-config'
import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_ERROR, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_ERROR, CATEGORY_SAVE_REQUEST, CATEGORY_SAVE_SUCCESS, CATEGORY_SAVE_ERROR, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCES, CATEGORY_DELETE_ERROR } from '../types';


const listCategories = () => async(dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST});
        const { data } = await axios.get(API_URL + '/categories');
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_ERROR, payload: error.message})
    }
}

const detailsCategory = (id) => async(dispatch) => {
    try {
        dispatch({type: CATEGORY_DETAILS_REQUEST, payload: id});
        const {data} = await axios.get(API_URL + '/categories/' + id);
        dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CATEGORY_DETAILS_ERROR, payload: error.message})
    }
}

const saveCategory = (category) => async (dispatch, getState) => {
    try {
      dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
      const { userSignin: { userInfo } } = getState();
      if (!category.id) {
        const { data } = await axios.post(API_URL + '/categories', category, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put(API_URL + '/categories/' + category.id, category, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
      }
  
    } catch (error) {
  
      dispatch({ type: CATEGORY_SAVE_ERROR, payload: error.message });
    }
  }

  const deleteCategory = (categoryId) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
      const { data } = await axios.delete(API_URL + "/categories/" + categoryId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: CATEGORY_DELETE_SUCCES, payload: data, success: true });
    } catch (error) {
      dispatch({ type: CATEGORY_DELETE_ERROR, payload: error.message });
  
    }
  }

 

export {listCategories, detailsCategory, saveCategory, deleteCategory}