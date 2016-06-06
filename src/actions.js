import firebase from 'firebase';

export const ACTION_TYPE = 'ACTION_TYPE';
export const INIT_AUTH = 'INIT_AUTH';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';

var config = {
    apiKey: "AIzaSyBfcrOgYzrNomUuBtOGb3pctnG09P-GmTE",
    authDomain: "euro-pronos.firebaseapp.com",
    databaseURL: "https://euro-pronos.firebaseio.com",
    storageBucket: "euro-pronos.appspot.com"
};

firebase.initializeApp(config);

export function signInError(error) {
    console.log('error');
    return {
        type: SIGN_IN_ERROR,
        payload: error
    };
}

export function signInSuccess(result) {
    console.log('success');
    return {
        type: SIGN_IN_SUCCESS,
        payload: result.user
    };
}

export function signInWithGoogle() {
    return dispatch => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(result => {
            console.log(result);
            dispatch(signInSuccess(result));

        }).catch(error => {
            dispatch(signInError(error));
        });
    }
}

export function signOut() {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => dispatch(signOutSuccess()));
    };
}

export function signOutSuccess() {
    return {
        type: SIGN_OUT_SUCCESS
    };
}

export function callYourAction() {
    return {
        type: ACTION_TYPE
    };
}
