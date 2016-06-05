import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callYourAction, signInWithGoogle, signOut } from '../actions.js';

import '../css/main.css';

class App extends Component {

    constructor(props){
        super(props);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signIn(event) {
        event.preventDefault();
        this.props.signInWithGoogle();
    }

    signOut(event) {
        event.preventDefault();
        this.props.signOut();
    }


    render() {
        const { appState, children, callYourAction } = this.props;
        const childrenWithProps = React.cloneElement(children, {appState, callYourAction});

        return (
            <div>
                <button onClick={this.signIn} type="button">Google</button>
                <button onClick={this.signOut} type="button">Sign out</button>
                {childrenWithProps}
            </div>
        );
    }
}

// map actions to this.props.someFunction
const mapDispatchToProps = (dispatch) => {
    return {
        callYourAction: () => {
            dispatch(callYourAction());
        },
        signInWithGoogle: () => {
            dispatch(signInWithGoogle());
        },
        signOut: () => {
            dispatch(signOut());
        }
    }
};

function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);