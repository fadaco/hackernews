
import {combineReducers} from 'redux';
import topstory from './top-stories.reducer';
import user from './user.reducer';

export default combineReducers({
    topstory,
    user
})