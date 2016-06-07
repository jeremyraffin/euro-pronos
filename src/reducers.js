import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ACTION_TYPE, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SET_APP_DATA, SET_USER_DATA } from './actions.js';

const initialState = {
    authenticated: false,
    id: null,
    displayName: null,
    matchs: null,
    userData: null,
};

export default function appState(state = initialState, {type, payload}) {
    switch (type) {
    case ACTION_TYPE:
        return Object.assign({}, state, {
            test: 'Hello World'
        });

    case SIGN_IN_SUCCESS:
        return Object.assign({}, state, {
            authenticated: true,
            id: payload.uid,
            displayName: payload.displayName
        });
    case SIGN_OUT_SUCCESS:
        return Object.assign({}, state, {
            authenticated: false,
            id: null
        });
    case SET_APP_DATA:
        return Object.assign({}, state, {
            matchs: payload
        });
    case SET_USER_DATA:
        return Object.assign({}, state, {
            userData: payload
        });
    default:
        return state;
    }
}

const store = combineReducers({
    appState,
    routing: routerReducer
});

export default store;
