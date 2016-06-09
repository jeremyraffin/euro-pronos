import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppData, getUserData, getScoreByUser, setUserData, signInWithGoogle, signOut } from '../actions.js';
import NavBar from '../components/NavBar.jsx';

import 'normalize-css';
import '../css/main.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { authenticated, userId, dispatch } = this.props;
        dispatch(getAppData());
        dispatch(getScoreByUser());
        if (authenticated) {
            this.props.getUserData(userId);
        }
    }

    compononentWillReceiveProps(nextProps) {
        const { userData, dispatch } = this.props;
        if (nextProps.userData.score !== userData.score) {
            dispatch(setUserData(nextProps.userId, nextProps.userData));
        }
    }

    renderChildrenWithProps() {
        const { userId, userData, matchs, matchsByDate, scoreByUser, children, dispatch } = this.props;
        const childrensProps = {
            Bets: {
                bets: userData.bets,
                score: userData.score,
                matchsByDate,
                handleChange: (newUserData) => dispatch(setUserData(userId, newUserData))
            },
            Calendar: {
                matchsByDate,
            },
            Ranking: {}
        };

        return React.cloneElement(this.props.children, {...childrensProps[children.type.name]});
    }

    render() {
        const { authenticated } = this.props;
        return (
            <div className="App">
                <header className="Header">
                    <h1 className="Logo">
                        <span>euro</span>
                        <span>pronos</span>
                    </h1>
                        <NavBar authenticated={authenticated}
                            signout={this.props.signOut}
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
