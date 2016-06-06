import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './App.jsx';
import YourComponent from '../components/YourComponent.jsx';

export default function Routes(props) {
    const history = syncHistoryWithStore(browserHistory, props.store);

    console.log(props.store.getState());

    function requireAuth() {
        const state = props.store.getState();
        const isAuth = state.appState.authenticated;
        if (!isAuth) {
            browserHistory.push();
        }
    }

    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={YourComponent} />
            </Route>
        </Router>
    );
}
