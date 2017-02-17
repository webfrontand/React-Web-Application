import {
  UPLOAD,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './Types';
import axios from 'axios';

export function uploadRequest(email, thumbnailName){
  return (dispatch) => {
    dispatch(upload())
    return axios.post('/api/auth/put', { email, thumbnailName })
    .then((response) => {
      dispatch(uploadSuccess())
    }).catch((error) => {
      dispatch(uploadFailure())
    })
  }
}

export function upload(){
  return {
    type: UPLOAD
  }
}

export function uploadSuccess(){
  return {
    type: UPLOAD_SUCCESS
  }
}

export function uploadFailure(){
  return {
    type: UPLOAD_FAILURE
  }
}
