import React, { PropTypes } from 'react';
import { Link } from 'react-router';

try {
    require('../css/main.css');
} catch (error) {
    console.log('can\'t import css.');
}

export default function NavBar(props) {

    const { signInWithGoogle, authenticated, signOut } = props;

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Résultats</Link>
                </li>
                {
                    authenticated ?
                        <li><Link to="/bets">Pronos</Link> </li>
                        : ''
                }
                <li>
                    <Link to="/ranking">Classement</Link>
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
};

NavBar.propTypes = {
};
