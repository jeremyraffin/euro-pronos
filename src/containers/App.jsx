import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppData, getUserData, setUserData, signInWithGoogle, signOut } from '../actions.js';
import NavBar from '../components/NavBar.jsx';

import '../css/main.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { authenticated, id } = this.props;
        this.props.getAppData();
        if (authenticated) {
            this.props.getUserData(id);
        }
    }

    render() {
        const { appState, children } = this.props;
        const childrenWithProps = React.cloneElement(children, {...appState, setUserData: this.props.setUserData});

        return (
            <div>
                <NavBar {...this.props} />
                {childrenWithProps}
            </div>
        );
    }
}

// map actions to this.props.someFunction
const mapDispatchToProps = (dispatch) => {
    return {
        signInWithGoogle: () => {
            dispatch(signInWithGoogle());
        },
        signOut: () => {
            dispatch(signOut());
        },
        getAppData: () => {
            dispatch(getAppData());
        },
        getUserData: (uuid) => {
            dispatch(getUserData(uuid));
        },
        setUserData: (uuid, newUserData) => {
            dispatch(setUserData(uuid, newUserData));
        },
    };
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
