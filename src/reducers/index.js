import authenticate from './authenticate';
import post from './post';

import { combineReducers } from 'redux';

export default combineReducers({
    authenticate,
    post
});
