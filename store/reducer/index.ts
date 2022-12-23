
import {combineReducers} from 'redux';
import topstory from './top-stories.reducer';
import user from './user.reducer';
import onboarding from './onboarding.reducer';
import match from './match.reducer';

export default combineReducers({
    topstory,
    user,
    onboarding,
    match
})