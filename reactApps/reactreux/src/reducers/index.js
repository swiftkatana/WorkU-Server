import {combineReducers} from 'redux';
import postsReducers from './postsReducers';
import usersReducers from './usersReducers'


export default combineReducers({
    gotUsers:usersReducers,
    gotPosts:postsReducers
});