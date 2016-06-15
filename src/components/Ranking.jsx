import React, { PropTypes } from 'react';

export default function Ranking(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Classement des joueurs (pour la semaine)</h2>
            <li className="MatchItem">
                <ul className="TeamList">
                    <li className="TeamItem">
                        <span className="team">
                        </span>
                        <span className="team">
                        </span>
                        <span className="score">
                            Total
                        </span>
                        <span className="score">
                            Week
                        </span>
                    </li>
                </ul>
            </li>
            <ul className="MatchList">
                {
                    props.scoreByUser.map(user => (
                        <li key={user.displayName} className="MatchItem">
                            <ul className="TeamList">
                                <li className="TeamItem">
                                    <span className="team">
                                        <img src={user.avatar} width="40px" height="40px"/>
                                    </span>
                                    <span className="team">
                                        {user.displayName}
                                    </span>
                                    <span className="score">
                                        {user.score}
                                    </span>
                                    <span className="score">
                                        {user.weekScore}
                                    </span>
                                </li>
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

Ranking.defaultProps = {
    scoreByUser: []
};

Ranking.propTypes = {
    scoreByUser: PropTypes.arrayOf(PropTypes.object)
};
