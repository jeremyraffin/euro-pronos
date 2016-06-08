import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function NavBar(props) {
    const { signInWithGoogle, appState, signOut } = props;

    return (
        <nav className="NavBar">
            <ul>
                <li>
                    <Link to="/">Calendrier</Link>
                </li>
                {
                    appState.authenticated ?
                        <li><Link to="/bets">Pronos</Link> </li>
                        : ''
                }
                <li>
                    <Link to="/ranking">Classement</Link>
                </li>
                <li>
                    {
                        appState.authenticated ?
                            <span className="Logout">{appState.displayName}, <button onClick={signOut} type="button">Logout</button></span>
                            : <button onClick={signInWithGoogle} type="button">Login</button>
                    }
                </li>
            </ul>
        </nav>
    );
}

NavBar.defaultProps = {
};

NavBar.propTypes = {
};
