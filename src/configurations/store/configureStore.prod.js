import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import store from '../../reducers.js';

const finalCreateStore = compose(
    persistState(),
    applyMiddleware(
        thunkMiddleware
  )
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(store, initialState);
}
