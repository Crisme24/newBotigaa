import axios from 'axios'
import {API_URL} from '../../api-config'
import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR} from'../types';
import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR} from '../types';
import {USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_ERROR} from '../types';
import {USER_LOGOUT } from '../types';
import Cookie from 'js-cookie';

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await axios.post(API_URL + '/users/login', { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNIN_ERROR, payload: error.message });
    }
  }

  const update = ( {name, email, password}) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: USER_UPDATE_REQUEST, payload: {name, email, password} });
    
      const { data } = await axios.put(API_URL + '/users', {name, email, password} , {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    
    } catch (error) {
      dispatch({ type: USER_UPDATE_ERROR, payload: error.message });
    }
  }

  const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
      const { data } = await axios.post(API_URL + '/users/register', { name, email, password });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_ERROR, payload: error.message });
    }
  }

  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }

export {signin, register, logout, update}