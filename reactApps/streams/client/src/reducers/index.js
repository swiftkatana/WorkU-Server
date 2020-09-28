import {combineReducers} from 'redux';
import {reducer} from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import selectedReducer from './selectedReducer';
import userReducer from './userReducer';

export default combineReducers({
    auth:authReducer,
    form:reducer,
    streams:streamReducer,
    selectedStream:selectedReducer,
    user:userReducer
});