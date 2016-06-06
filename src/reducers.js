import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ACTION_TYPE, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SET_APP_DATA, SET_USER_DATA } from './actions.js';

const initialState = {
    test: 'Coucou monde',
    authenticated: false,
    id: null,
    appData: [],
    userData: {},
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
            id: payload.uid
        });
    case SIGN_OUT_SUCCESS:
        return Object.assign({}, state, {
            authenticated: false,
            id: null
        });
    case SET_APP_DATA:
        return Object.assign({}, state, {
            appData: payload
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
