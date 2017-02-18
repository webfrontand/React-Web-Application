import {
  POST,
  POST_SUCCESS,
  POST_FAILURE,
  LIST,
  LIST_SUCCESS,
  LIST_FAILURE,
  DETAIL,
  DETAIL_SUCCESS,
  DETAIL_FAILURE,
  DETAIL_UPDATE,
  DETAIL_UPDATE_SUCCESS,
  DETAIL_UPDATE_FAILURE,
  DETAIL_DELETE,
  DETAIL_DELETE_SUCCESS,
  DETAIL_DELETE_FAILURE,
  RECOMMENT,
  RECOMMENT_SUCCESS,
  RECOMMENT_FAILURE
} from './Types';
import axios from 'axios';
import { storageGet } from './helper/localStorage';


export function listRequest(){
  return (dispatch) => {
    dispatch(list());
    return axios.get('/api/list')
    .then((response) => {
      dispatch(listSuccess(response.data.result));
    }).catch((error) => {
      dispatch(listFailure());
    })
  }
}

export function list(){
  return {
    type: LIST
  }
}
export function listSuccess(lists){
  return {
    type: LIST_SUCCESS,
    lists
  }
}

export function listFailure(){
  return {
    type: LIST_FAILURE
  }
}

export function postRequest(title, article, username){
  return (dispatch) => {
    dispatch(post())

    let token = storageGet();
    let config = {
      headers: { 'x-access-token' : token }
    };

    return axios.post('/api/post', { title, article, username }, config)
    .then((response) => {
      dispatch(postSuccess())
    }).catch((error) => {
      dispatch(postFailure(error.response.data.code))
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

export function postFailure(error){
  return {
    type: POST_FAILURE,
    error
  }
}

export function detailRequest(id){
  return (dispatch) => {
    dispatch(detail())
    return axios.get(`/api/list/${id}`)
    .then((response) => {
      dispatch(detailSuccess(response.data.result))
    }).catch((error) => {
      dispatch(detailFailure())
    })
  }
}

export function detail(){
  return {
    type: DETAIL
  }
}

export function detailSuccess(result){
  return {
    type: DETAIL_SUCCESS,
    result
  }
}

export function detailFailure(){
  return {
    type: DETAIL_FAILURE
  }
}

export function detailupdateRequest(title, article, id){
  return (dispatch) => {
    dispatch(detailupdate());

    let token = storageGet();
    let config = {
      headers: { 'x-access-token' : token }
    };

    return axios.put(`/api/post/${id}`, { title, article }, config)
    .then((response) => {
      dispatch(detailupdateSuccess(response.data.result))
    }).catch((error) => {
      dispatch(detailupdateFailure(error.response.data.code))
    })
  }
}

export function detailupdate(){
  return {
    type: DETAIL_UPDATE
  }
}

export function detailupdateSuccess(result){
  return {
    type: DETAIL_UPDATE_SUCCESS,
    result
  }
}

export function detailupdateFailure(error){
  return {
    type: DETAIL_UPDATE_FAILURE,
    error
  }
}

export function detaildeleteRequest(id){

  let token = storageGet();
  let config = {
    headers: { 'x-access-token' : token }
  };

  return (dispatch) => {
    dispatch(detaildelete())
    return axios.delete(`/api/post/${id}`, config)
    .then((response) => {
      dispatch(detaildeleteSuccess())
    }).catch((error) => {
      dispatch(detaildeleteFailure(error.response.data.code));
    })
  }
}

export function detaildelete(){
  return {
    type: DETAIL_DELETE
  }
}

export function detaildeleteSuccess(){
  return {
    type: DETAIL_DELETE_SUCCESS
  }
}

export function detaildeleteFailure(error){
  return {
    type: DETAIL_DELETE_FAILURE,
    error
  }
}

export function recommentRequest(id){

  let token = storageGet();
  let config = {
    headers: { 'x-access-token' : token }
  };

  return (dispatch) => {
    dispatch(recommend())
    console.log(config);
    return axios.post(`/api/star/${id}`, {}, config)
    .then((response) => {
      dispatch(recommendSuccess(response.data.user))
    }).catch((error) => {
      dispatch(recommendFailure(error.response.data.code));
    })
  }
}

export function recommend(){
  return {
    type: RECOMMENT
  }
}
export function recommendSuccess(user){
  return {
    type: RECOMMENT_SUCCESS,
    user
  }
}

export function recommendFailure(error){
  return {
    type: RECOMMENT_FAILURE,
    error
  }
}
