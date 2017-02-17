import {
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE
} from './Types';
import axios from 'axios';
import { storageGet } from './helper/localStorage';

export function checkRequest(){
  return (dispatch) => {

    return axios.get('/api/auth/token', {
        headers: {
          'x-access-token': storageGet()
        }
    }).then((response) => {
      dispatch(checkSuccess(response.data.userinfo))
    }).catch((error) => {
      dispatch(checkFailure())
    })
  }
}

export function check(){
  return {
    type: CHECK
  }
}

export function checkSuccess(info){
  return {
    type: CHECK_SUCCESS,
    info
  }
}

export function checkFailure(){
  return {
    type: CHECK_FAILURE
  }
}
