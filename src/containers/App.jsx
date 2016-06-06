import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppData, signInWithGoogle, signOut } from '../actions.js';
import NavBar from '../components/NavBar.jsx';

import '../css/main.css';

class App extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.getAppData();
    }

    render() {
        const { appState, children } = this.props;
        const childrenWithProps = React.cloneElement(children, {appState});

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
        }
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
