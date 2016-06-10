import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import moment from 'moment';
moment.locale('fr');

import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SET_APP_DATA, SET_USER_DATA, SET_SCORE_BY_USER } from './actions.js';

const initialState = {
    authenticated: false,
    id: null,
    matchs: [],
    matchsByDate: [],
    scoreByUser: [],
    userData: {
        bets: [],
        score: 0,
        avatar: null,
        displayName: null,
    },
};

function isPerfectBetMatching(bet, match) {
    return match.team1.score === bet.team1.score && match.team2.score === bet.team2.score;
}

function isPartialBetMatching(bet, match) {
    return Math.sign(match.team1.score - match.team1.score) === Math.sign(bet.team1.score - bet.team2.score);
}

function checkDate(matchDate) {
    return moment() >= moment(matchDate);
}

function computeMatchScore(bet, match) {
    if (checkDate(match.date) && match.team1.score && match.team2.score) {
        if (isPerfectBetMatching(bet, match)) {
            return 3;
        } else if (isPartialBetMatching(bet, match)) {
            return 1;
        }
    }
    return 0;
}

function computeUserScore(matchs, bets) {
    const scoreByBet = bets.map(bet => computeMatchScore(bet, matchs.find(match => match.id === bet.id)));
    return scoreByBet.reduce((n, v) => n + v, 0);
}

function orderMatchsByDate(matchs) {
    return ([...new Set(matchs.map(match =>
        moment(match.date).format('L')
    ))].map(date =>
        matchs.filter(match => moment(match.date).format('L') === date)
    ));
}

export default function appState(state = initialState, {type, payload}) {
    switch (type) {
    case SIGN_IN_SUCCESS:
        return Object.assign({}, state, {
            authenticated: true,
            id: payload.uid,
        });
    case SIGN_OUT_SUCCESS:
        return Object.assign({}, state, {
            authenticated: false,
            id: null
        });
    case SET_APP_DATA:
        return Object.assign({}, state, {
            matchs: payload,
            matchsByDate: orderMatchsByDate(payload),
            userData: {
                score: computeUserScore(payload, state.userData.bets)
            }
        });
    case SET_USER_DATA:
        return Object.assign({}, state, {
            userData: Object.assign({}, state.userData, payload, {score: computeUserScore(state.matchs, payload.bets)})
        });
    case SET_SCORE_BY_USER:
        return Object.assign({}, state, {
            scoreByUser: payload.sort((p, n) => p - n)
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
