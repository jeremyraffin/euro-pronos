import React, { PropTypes } from 'react';

export default function Ranking(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Classement des joueurs</h2>
            <ul className="MatchList">
                {
                    props.scoreByUser.map(user => (
                        <li key={user.displayName} className="MatchItem">
                            <ul className="TeamList">
                                <li className="TeamItem">
                                    <span className="team">
                                        <img src={user.avatar} width="40px"/>
                                    </span>
                                    <span className="team">
                                        {user.displayName}
                                    </span>
                                    <span className="score">
                                        {user.score}
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
