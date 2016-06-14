import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';

import { getAppData, getUserData, getScoreByUser, setUserData, signInWithGoogle, signOut, initAuth } from '../actions.js';
import NavBar from '../components/NavBar.jsx';

import 'normalize-css';
import '../css/main.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { authenticated, dispatch } = this.props;
        dispatch(getAppData());
        dispatch(getScoreByUser());
        const userId = localStorage.getItem('id');
        if (userId) {
            dispatch(initAuth());
            dispatch(getUserData(userId));
            
        }
    }

    compononentWillReceiveProps(nextProps) {
        const { userData, userId, dispatch } = this.props;
        if (nextProps.userId !== userId) {
            dispatch(getUserData(nextProps.userId));
        }
        if (nextProps.userData.score !== userData.score) {
            dispatch(setUserData(nextProps.userId, nextProps.userData));
        }
    }

    renderChildrenWithProps() {
        const { userId, userData, matchs, matchsByDate, scoreByUser, children, dispatch } = this.props;
        const childrensProps = {
            Bets: {
                userData,
                matchsByDate,
                handleChange: (newUserData) => dispatch(setUserData(userId, newUserData))
            },
            Calendar: {
                matchsByDate,
            },
            Ranking: {
                scoreByUser
            }
        };
        return React.cloneElement(children, {...childrensProps[children.type.name]});
    }

    render() {
        const { authenticated } = this.props;
        return (
            <div className="App">
                <header className="Header">
                    <h1 className="Logo">
                        <IndexLink activeClassName="active" to="/">
                            <span>euro</span>
                            <span>pronos</span>
                        </IndexLink>
                    </h1>
                        <NavBar authenticated={authenticated}
                            signOut={this.props.signOut}
                            signInWithGoogle={this.props.signInWithGoogle} />
                </header>
                <main className="Main">
                    {this.renderChildrenWithProps()}
                </main>
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
        dispatch
    };
};

function mapStateToProps(state) {
    return {
        matchs: state.appState.matchs,
        matchsByDate: state.appState.matchsByDate,
        scoreByUser: state.appState.scoreByUser,
        authenticated: state.appState.authenticated,
        userData: state.appState.userData,
        userId: state.appState.id,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
