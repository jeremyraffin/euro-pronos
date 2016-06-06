import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, push } from 'react-router-redux';

import App from './App.jsx';
import Calendar from '../components/Calendar.jsx';
import Bets from '../components/Bets.jsx';
import Ranking from '../components/Ranking.jsx';

export default function Routes(props) {
    const history = syncHistoryWithStore(browserHistory, props.store);

    function requireAuth(nextState, replace) {
        const state = props.store.getState();
        const isAuth = state.appState.authenticated;
        if (!isAuth) {
            replace('/')
        }
    }

    return (
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Calendar} />
                <Route path="bets" component={Bets} onEnter={requireAuth} />
                <Route path="ranking" component={Ranking} />
            </Route>
        </Router>
    );
}
