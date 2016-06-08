import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SET_APP_DATA, SET_USER_DATA } from './actions.js';

const initialState = {
    authenticated: false,
    id: null,
    displayName: null,
    matchs: null,
    userData: {
        bets: [],
        score: 0,
    },
};

function isPerfectBetMatching(bet, match) {
    return match.team1.score === bet.team1.score && match.team2.score === bet.team2.score;
}

function isPartialBetMatching(bet, match) {
    return Math.sign(match.team1.score - match.team1.score) === Math.sign(bet.team1.score - bet.team2.score);
}

function computeMatchScore(bet, match) {
    if (match.team1.score && match.team2.score) {
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

export default function appState(state = initialState, {type, payload}) {
    switch (type) {
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
            matchs: payload,
            userData: {
                score: computeUserScore(payload, state.userData.bets)
            }
        });
    case SET_USER_DATA:
        return Object.assign({}, state, {
            userData: Object.assign({}, payload, {score: computeUserScore(state.matchs, payload.bets)})
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
