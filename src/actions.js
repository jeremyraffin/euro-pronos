import firebase from 'firebase';
import { browserHistory } from 'react-router';

export const ACTION_TYPE = 'ACTION_TYPE';
export const INIT_AUTH = 'INIT_AUTH';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SET_APP_DATA = 'SET_APP_DATA';
export const SET_USER_DATA = 'SET_USER_DATA';

const config = {
    apiKey: 'AIzaSyBfcrOgYzrNomUuBtOGb3pctnG09P-GmTE',
    authDomain: 'euro-pronos.firebaseapp.com',
    databaseURL: 'https://euro-pronos.firebaseio.com',
    storageBucket: 'euro-pronos.appspot.com'
};

firebase.initializeApp(config);

export function setAppData(newAppData) {
    return {
        type: SET_APP_DATA,
        payload: newAppData
    };
}

export function getAppData() {
    return dispatch => {
        firebase.database().ref('/matchs/')
            .once('value')
            .then(result => {
                dispatch(setAppData(result.val()));
            }).catch(error => {
                console.log(error);
            });
    };
}

export function updateUserData(userId, userData) {
    firebase.database().ref(`/users/${userId}`).set({...userData});
}

export function setUserData(userId, newUserData) {
    updateUserData(userId, newUserData);
    return {
        type: SET_USER_DATA,
        payload: newUserData
    };
}

export function getUserData(userId) {
    return dispatch => {
        firebase.database().ref(`/users/${userId}`)
            .once('value')
            .then(result => {
                const userData = Object.is(result.val(), null) ? {bets: [], score: 0} : result.val();
                dispatch(setUserData(userId, userData));
            }).catch(error => {
                console.log(error);
            });
    };
}

export function signInError(error) {
    return {
        type: SIGN_IN_ERROR,
        payload: error
    };
}

export function signInSuccess(userCredentials) {
    return {
        type: SIGN_IN_SUCCESS,
        payload: userCredentials
    };
}

export function signOutSuccess() {
    browserHistory.push('/');
    return {
        type: SIGN_OUT_SUCCESS
    };
}

export function signInWithGoogle() {
    return dispatch => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(result => {
                dispatch(getUserData(result.user.uid));
                dispatch(signInSuccess(result.user));
            }).catch(error => {
                dispatch(signInError(error));
            });
    };
}

export function signOut() {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => dispatch(signOutSuccess()));
    };
}
