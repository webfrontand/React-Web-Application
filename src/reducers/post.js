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
} from '../actions/Types';
import update from 'react-addons-update';


const initialState = {
  postrequest: {
    status: 'INIT',
    error: -1
  },
  data: {
    list: [],
    status: 'INIT'
  },
  detail: {
    result: [],
    status: 'INIT'
  },
  update: {
    status: 'INIT',
    error: -1
  },
  delete: {
    status: 'INIT',
    error: -1
  },
  recommend: {
    status: 'INIT',
    error: -1
  }
}

export default function post(state = initialState, action){
  switch(action.type){
    case POST:
      return update(state, {
        postrequest: {
          status: { $set: 'WAIT' }
        }
      });
    case POST_SUCCESS:
      return update(state, {
        postrequest: {
          status: { $set: 'SUCCESS' }
        }
      });
    case POST_FAILURE:
      return update(state, {
        postrequest: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case LIST:
      return update(state, {
        data: {
          status: { $set: 'WAIT' }
        }
      });
    case LIST_SUCCESS:
      return update(state, {
        data: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.lists }
        }
      });
    case LIST_FAILURE:
      return update(state, {
        data: {
          status: { $set: 'FAILURE' }
        }
      });
    case DETAIL:
      return update(state, {
        detail: {
          status: { $set: 'WAIT' },
          result: { $set: '' }
        }
      });
    case DETAIL_SUCCESS:
      return update(state, {
        detail: {
          status: { $set: 'SUCCESS' },
          result: { $set: action.result }
        }
      });
    case DETAIL_FAILURE:
      return update(state, {
        detail: {
          status: { $set: 'FAILURE' }
        }
      });
    case DETAIL_UPDATE:
      return update(state, {
        update: {
          status: { $set: 'WAIT' }
        }
      });
    case DETAIL_UPDATE_SUCCESS:
      return update(state, {
        update: {
          status: { $set: 'SUCCESS' }
        },
        detail: {
          result: { $set: action.result }
        }
      });
    case DETAIL_UPDATE_FAILURE:
      return update(state, {
        update: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case DETAIL_DELETE:
      return update(state, {
        delete: {
          status: { $set: 'WAIT' }
        }
      });
    case DETAIL_DELETE_SUCCESS:
      return update(state, {
        delete: {
          status: { $set: 'SUCCESS' }
        }
      });
    case DETAIL_DELETE_FAILURE:
      return update(state, {
        delete: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case RECOMMENT:
      return update(state, {
        recommend: {
          status: { $set: 'WAIT' }
        }
      });
    case RECOMMENT_SUCCESS:
      return update(state, {
        recommend: {
          status: { $set: 'SUCCESS' }
        },
        detail: {
          result: {
            starred: { $set: action.user }
          }
        }
      });
    case RECOMMENT_FAILURE:
      return update(state, {
        recommend: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      })
    default:
      return state;
  }
}
