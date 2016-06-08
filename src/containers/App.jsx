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

    renderChildrenWithProps() {
        const { userData, matchs, children } = this.props;
        const childrensProps = {
            Bets: {
                bets: userData.bets,
                score: userData.score,
                matchs,
                handleChange: this.props.setUserData
            }
        };

        return React.cloneElement(this.props.children, {...childrensProps[children.type.name]});
    }

    render() {
        const { authenticated } = this.props;
        return (
            <div>
                <NavBar authenticated={authenticated}
                    signout={this.props.signOut}
                    signInWithGoogle={this.props.signInWithGoogle} />
                {this.renderChildrenWithProps()}
            </div>
        );
    }
}

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
        matchs: state.appState.matchs,
        authenticated: state.appState.authenticated,
        userData: state.appState.userData,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
