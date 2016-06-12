import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function NavBar(props) {
    const { signInWithGoogle, authenticated, signOut } = props;

    return (
        <nav className="NavBar">
            <ul>
                {
                    authenticated ?
                        <li>
                            <Link activeClassName="active" to="/bets" title="Mes pronos">
                                <span className="icon-futbol-o"></span>
                                Pronos
                            </Link>
                        </li>
                        : ''
                }
                <li>
                    <Link activeClassName="active" to="/ranking" title="Classement">
                        <span className="icon-trophy"></span>
                        Classement
                    </Link>
                </li>
                <li>
                    {
                        authenticated ?
                            <button onClick={signOut} type="button" title="Sign out">
                                <span className="icon-sign-out"></span>
                                Logout
                            </button>
                            : <button onClick={signInWithGoogle} type="button" title="Sign in">
                                <span className="icon-sign-in"></span>
                                Login
                            </button>
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
