import {
  POST,
  POST_SUCCESS,
  POST_FAILURE
} from './Types';
import axios from 'axios';

export function postRequest(title, url, urltitle){
  return (dispatch) => {
    return axios.post('/api/post', { title, url, urltitle })
    .then((response) => {
      dispatch(postSuccess())
    }).catch((error) => {
      dispatch(postFailure())
    })
  }
}

export function post(){
  return {
    type: POST
  }
}

export function postSuccess(){
  return {
    type: POST_SUCCESS
  }
}

export function postFailure(){
  return {
    type: POST_FAILURE
  }
}
