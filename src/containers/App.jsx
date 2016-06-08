import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAppData, getUserData, setUserData, signInWithGoogle, signOut } from '../actions.js';
import NavBar from '../components/NavBar.jsx';

import 'normalize-css';
import '../css/main.css';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { authenticated, userId } = this.props;
        this.props.getAppData();
        if (authenticated) {
            this.props.getUserData(userId);
        }
    }

    renderChildrenWithProps() {
        const { userId, userData, matchs, children, dispatch } = this.props;
        const childrensProps = {
            Bets: {
                bets: userData.bets,
                score: userData.score,
                matchs,
                handleChange: (newUserData) => dispatch(setUserData(userId, newUserData))
            },
            Calendar: {
                matchs,
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
        getAppData: () => {
            dispatch(getAppData());
        },
        getUserData: (uuid) => {
            dispatch(getUserData(uuid));
        },
        dispatch
    };
};

function mapStateToProps(state) {
    return {
        matchs: state.appState.matchs,
        authenticated: state.appState.authenticated,
        userData: state.appState.userData,
        userId: state.appState.id,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
