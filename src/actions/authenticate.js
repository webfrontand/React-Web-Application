import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  OUT,
  OUT_SUCCESS
} from './Types';
import axios from 'axios';
import { storageGet, storageSet, clearStorage } from './helper/localStorage';

export function loginRequest(email, password){
  return (dispatch) => {
    dispatch(login());

    return axios.post('/api/auth/login', { email, password})
    .then((response) => {
      storageSet(response.data.decoded)
      dispatch(loginSuccess(response.data.userinfo));
    }).catch((error) => {
      dispatch(loginFailure(error.response.data.code));
    })
  }
}

export function login(){
  return {
    type: AUTH_LOGIN
  }
}

export function loginSuccess(userinfo){
  return {
    type: AUTH_LOGIN_SUCCESS,
    userinfo
  }
}

export function loginFailure(error){
  return {
    type: AUTH_LOGIN_FAILURE,
    error
  }
}

export function registerRequest(email, password, username){
  return (dispatch) => {
    dispatch(register());

    return axios.post('/api/auth/register', {email, password, username }).
    then((response) => {
      storageSet(response.data.token);
      dispatch(registerSuccess());
    }).catch((error) => {
      dispatch(registerFailure(error.response.data.code));
    })
  }
}

export function register(){
  return {
    type: AUTH_REGISTER
  }
}

export function registerSuccess(){
  return {
    type: AUTH_REGISTER_SUCCESS
  }
}

export function registerFailure(error){
  return {
    type: AUTH_REGISTER_FAILURE,
    error
  }
}

export function logoutRequest(){
  return (dispatch) => {
    clearStorage();
    dispatch(logout());
  }
}

export function logout(){
  return {
    type: AUTH_LOGOUT
  }
}

export function outRequest(){
  return (dispatch) => {
    dispatch(out());
    let token = storageGet();
    return axios.delete('/api/user', {
        headers: {
          'x-access-token': token
        }
    }).then((response) => {
      dispatch(outSuccess());
    })
  }
}


export function out(){
  return {
    type: OUT
  }
}
export function outSuccess(){
  return {
    type: OUT_SUCCESS
  }
}
