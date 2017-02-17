import {
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE
} from './Types';
import axios from 'axios';
import { storageGet } from './helper/localStorage';
export function userUpdateRequest(username, password){
  return (dispatch) => {
    dispatch(userUpdate());

    let token = storageGet();
    let config = {
      headers: { 'x-access-token' : token }
    };

    return axios.put('api/user', { username, password },config )
    .then((response) => {
      dispatch(userUpdateSuccess());
    }).catch((error) => {
      dispatch(userUpdateFailure(error.response.data.code));
    })
  }
}

export function userUpdate(){
  return {
    type: USER_UPDATE
  }
}

export function userUpdateSuccess(){
  return {
    type: USER_UPDATE_SUCCESS
  }
}

export function userUpdateFailure(error){
  return {
    type: USER_UPDATE_FAILURE,
    error
  }
}
