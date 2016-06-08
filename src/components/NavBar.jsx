import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

export default function NavBar(props) {
    const { signInWithGoogle, authenticated, signOut } = props;

    return (
        <nav className="NavBar">
            <ul>
                <li>
                    <IndexLink activeClassName="active" to="/">Calendrier</IndexLink>
                </li>
                {
                    authenticated ?
                        <li><Link activeClassName="active" to="/bets">Pronos</Link> </li>
                        : ''
                }
                <li>
                    <Link activeClassName="active" to="/ranking">Classement</Link>
                </li>
                <li>
                    {
                        authenticated ?
                            <button onClick={signOut} type="button">Logout</button>
                            : <button onClick={signInWithGoogle} type="button">Login</button>
                    }
                </li>
            </ul>
        </nav>
    );
}

NavBar.defaultProps = {
    authenticated: false,
    signInWithGoogle: () => {},
    signOut: () => {}
};

NavBar.propTypes = {
    authenticated: PropTypes.bool,
    signInWithGoogle: PropTypes.func,
    signOut: PropTypes.func
};
