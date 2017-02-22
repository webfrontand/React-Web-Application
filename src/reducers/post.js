import {
  POST,
  POST_SUCCESS,
  POST_FAILURE,
  LIST,
  LIST_SUCCESS,
  LIST_FAILURE,
  LIST_ADD,
  LIST_ADD_SUCCESS,
  LIST_ADD_FAILURE,
  LIST_ADMIN,
  LIST_ADMIN_SUCCESS,
  LIST_ADMIN_FAILURE,
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
  RECOMMENT_FAILURE,
  COMMENT_LIST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAILURE,
  COMMENT_ADD,
  COMMENT_ADD_SUCCESS,
  COMMENT_ADD_FAILURE,
  COMMENT_MORE,
  COMMENT_MORE_SUCCESS,
  COMMENT_MORE_FAILURE,
  COMMENT_REMOVE,
  COMMENT_REMOVE_SUCCESS,
  COMMENT_REMOVE_FAILURE,
  COMMENT_UPDATE,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAILURE,
  SHARE,
  SHARE_SUCCESS,
  SHARE_FAILURE,
  MESSAGE,
  MESSAGE_SUCCESS,
  MESSAGE_FAILURE,
  PERMISSION,
  PERMISSION_FAILURE,
  PERMISSION_SUCCESS,
  REJECT,
  REJECT_SUCCESS,
  REJECT_FAILURE
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
  },
  listadd: {
    status: 'INIT',
    error: -1,
    last: false
  },
  comment: {
    status: 'INIT',
    list: []
  },
  commentadd: {
    status: 'INIT',
    error: -1
  },
  commentmore: {
    status: 'INIT',
    error: -1,
    last: false
  },
  commentremove: {
    status: 'INIT',
    error: -1
  },
  commentupdate: {
    status: 'INIT',
    error: -1
  },
  share: {
    status: 'INIT',
    error: -1
  },
  message: {
    status: 'INIT',
    error: -1,
    list: []
  },
  permission: {
    status: 'INIT',
    error: -1
  },
  reject: {
    status: 'INIT',
    error: -1
  },
  admin: {
    lists: [],
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
        },
        listadd: {
          last: { $set: false }
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
        },
        listadd: {
          last: { $set: false }
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
      });
    case LIST_ADD:
      return update(state, {
        listadd: {
          status: { $set: 'WAIT' },
          last: { $set: false }
        }
      });
    case LIST_ADD_SUCCESS:
      console.log(action.result.length);
      return update(state, {
        listadd: {
          status: { $set: 'SUCCESS' },
          last: { $set: action.result.length < 5 ? true : false }
        },
        data: {
          list: { $push: action.result }
        }
      });
    case LIST_ADD_FAILURE:
      return update(state, {
        listadd: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case COMMENT_LIST:
      return update(state, {
        comment: {
          status: { $set: 'WAIT' }
        }
      });
    case COMMENT_LIST_SUCCESS:
      return update(state, {
        comment: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.result }
        }
      });
    case COMMENT_LIST_FAILURE:
      return update(state, {
        comment: {
          status: { $set: 'FAILURE' }
        }
      });
    case COMMENT_ADD:
      return update(state, {
        commentadd: {
          status: { $set: 'WAIT' }
        }
      });
    case COMMENT_ADD_SUCCESS:
      return update(state, {
        commentadd: {
          status: { $set: 'SUCCESS' }
        },
        comment: {
          list: { $unshift: [action.result] }
        }
      });
    case COMMENT_ADD_FAILURE:
      return update(state, {
        commentadd: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case COMMENT_MORE:
      return update(state, {
        commentmore: {
          status: { $set: 'WAIT' }
        }
      });
    case COMMENT_MORE_SUCCESS:
      return update(state, {
        commentmore: {
          status: { $set: 'SUCCESS' },
          last: { $set: action.result.length < 2 ? true : false}
        },
        comment: {
          list: { $push: action.result }
        }
      });
    case COMMENT_MORE_FAILURE:
      return update(state, {
        commentmore: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case COMMENT_REMOVE:
      return update(state, {
        commentremove: {
          status: { $set: 'WAIT' }
        }
      });
    case COMMENT_REMOVE_SUCCESS:
      return update(state, {
        commentremove: {
          status: { $set: 'SUCCESS' }
        },
        comment: {
          list: { $splice: [[action.index, 1]]}
        }
      });
    case COMMENT_REMOVE_FAILURE:
      return update(state, {
        commentremove: {
          status: { $set: 'FAILURE' }
        }
      });
    case COMMENT_UPDATE:
      return update(state, {
        commentupdate: {
          status: { $set: 'WAIT' }
        }
      });
    case COMMENT_UPDATE_SUCCESS:
      return update(state, {
        commentupdate: {
          status: { $set: 'SUCCESS'}
        },
        comment: {
          list: {
            [action.index]: { $set: action.result }
          }
        }
      });
    case COMMENT_UPDATE_FAILURE:
      return update(state, {
        commentupdate: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error }
        }
      });
    case SHARE:
      return update(state, {
        share: {
          status: { $set: 'WAIT' }
        }
      });
    case SHARE_SUCCESS:
      return update(state, {
        share: {
          status: { $set: 'SUCCESS' }
        },
        detail: {
          result: {
            shareRequestUser: { $set: action.result }
          }
        }
      });
    case SHARE_FAILURE:
      return update(state, {
        share: {
          status: { $set: 'FAILURE'}
        }
      });
    case MESSAGE:
      return update(state, {
        message: {
          status: { $set: 'WAIT' },
          error: { $set: -1 }
        }
      });
    case MESSAGE_SUCCESS:
      return update(state, {
        message: {
          status: { $set: 'SUCCESS' },
          list: { $set: action.result }
        }
      });
    case MESSAGE_FAILURE:
      return update(state, {
        message: {
          status: { $set: 'FAILURE' }
        }
      });
    case PERMISSION:
      return update(state, {
        permission: {
          status: { $set: 'WAIT' }
        }
      });
    case PERMISSION_SUCCESS:
      return update(state, {
        permission: {
          status: { $set: 'SUCCESS' }
        },
        message: {
          list: { $splice: [[action.index, 1]]}
        }
      });
    case PERMISSION_FAILURE:
      return update(state, {
        permission: {
          status: { $set: 'FAILURE' }
        }
      });
    case REJECT:
      return update(state, {
        reject: {
          status: { $set: 'WAIT' }
        }
      });
    case REJECT_SUCCESS:
      return update(state, {
        reject: {
          status: { $set: 'SUCCESS' }
        },
        message: {
          list: { $splice: [[action.index, 1]]}
        }
      });
    case REJECT_FAILURE:
      return update(state, {
        reject: {
          status: { $set: 'FAILURE' }
        }
      });
    case LIST_ADMIN:
      return update(state, {
        admin: {
          status: { $set: 'WAIT' }
        }
      });
    case LIST_ADMIN_SUCCESS:
      return update(state, {
        admin: {
          lists: { $set: action.lists },
          status: { $set: 'SUCCESS'}
        }
      });
    case LIST_ADMIN_FAILURE:
      return update(state, {
        admin: {
          status: { $set: 'FAILURE' }
        }
      })
    default:
      return state;
  }
}
