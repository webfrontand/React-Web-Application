import {
  POST,
  POST_SUCCESS,
  POST_FAILURE
} from '../actions/Types';
import update from 'react-addons-update';


const initialState = {
  postrequest: {
    status: 'INIT',
    error: -1
  }
}

export default function post(state = initialState, action){
  switch(action.type){
    case POST:
      return update(state, {
        postRequest: {
          status: { $set: 'WAIT' }
        }
      });
    case POST_SUCCESS:
      return update(state, {
        postRequest: {
          status: { $set: 'SUCCESS' }
        }
      });
    case POST_FAILURE:
      return update(state, {
        postRequest: {
          status: { $set: 'FAILURE' }
        }
      });
    default:
      return state;
  }
}
