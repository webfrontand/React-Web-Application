import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  CHECK,
  CHECK_SUCCESS,
  CHECK_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT,
  USER_UPDATE,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  OUT,
  OUT_SUCCESS,
  UPLOAD,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from '../actions/Types';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT',
    error: -1
  },
  check: {
    status: 'INIT',
    userinfo: [],
    valid: true
  },
  register: {
    status: 'INIT',
    error: -1
  },
  userupdate: {
    status: 'INIT',
    error: -1
  },
  out: {
    status: 'INIT'
  },
  upload: {
    status: 'INIT'
  }
}
export default function authentication(state = initialState, action){
  switch(action.type){
    case AUTH_LOGIN:
      return update(state, {
        login: {
          status: { $set: 'WAIT' }
        }
      });
    case AUTH_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' }
        },
        check: {
          status: { $set: 'SUCCESS' },
          userinfo: { $set: action.userinfo },
          valid: { $set: true }
        }
      });
    case AUTH_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case CHECK:
      return update(state, {
        check: {
          status: { $set: 'WAIT' },
          valid: { $set: false }
        }
      });
    case CHECK_SUCCESS:
      return update(state, {
        check: {
          status: { $set: 'SUCCESS' },
          userinfo: { $set: action.info },
          valid: { $set: true }
        }
      });
    case CHECK_FAILURE:
      return update(state, {
        check: {
          status: { $set: 'FAILURE' },
          valid: { $set: false }
        }
      });
    case AUTH_LOGOUT:
      return update(state, {
        check: {
          status: { $set: 'INIT' },
          userinfo: { $set: [] },
          valid: { $set: false }
        }
      });
    case AUTH_REGISTER:
      return update(state, {
        register: {
          status: { $set: 'WAIT' },
        }
      });
    case AUTH_REGISTER_SUCCESS:
      return update(state, {
        register: {
          status: { $set: 'SUCCESS' }
        },
        check: {
          valid: { $set: true }
        }
      });
    case AUTH_REGISTER_FAILURE:
      return update(state, {
        register: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case USER_UPDATE:
      return update(state, {
        userupdate: {
          status: { $set: 'WAIT' }
        }
      });
    case USER_UPDATE_SUCCESS:
      return update(state, {
        userupdate: {
          status: { $set: 'SUCCESS' }
        }
      });
    case USER_UPDATE_FAILURE:
      return update(state, {
        userupdate: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case OUT:
      return update(state, {
        out: {
          status: { $set: 'INIT' }
        }
      });
    case OUT_SUCCESS:
      return update(state, {
        out: {
          status: { $set: 'SUCCESS' }
        }
      });
    case UPLOAD:
      return update(state, {
        upload: {
          status: { $set: 'WAIT' }
        }
      });
    case UPLOAD_SUCCESS:
      return update(state, {
        upload: {
          status: { $set: 'SUCCESS' }
        }
      });
    case UPLOAD_FAILURE:
      return update(state, {
        upload: {
          status: { $set: 'FAILURE' }
        }
      })
    default:
      return state;
  }
}
