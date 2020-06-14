import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR } from "../types";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR } from "../types";
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_ERROR } from "../types";
import { USER_LOGOUT } from "../types";


function userSigninReducer(state={}, action){
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true}
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_SIGNIN_ERROR:
            return{loading: false, error: action.payload}
        case USER_LOGOUT:
            return {};
        default:
            return state
    }
}

function userUpdateReducer(state={}, action){
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {loading: true}
        case USER_UPDATE_SUCCESS:
            return {loading: false,success: true, userInfo: action.payload}
        case USER_UPDATE_ERROR:
            return{loading: false, error: action.payload}
        default:
            return state
    }
}

function userRegisterReducer(state={}, action){
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_ERROR:
            return{loading: false, error: action.payload}
        default:
            return state
    }
}

export {userSigninReducer, userRegisterReducer, userUpdateReducer}