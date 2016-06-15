import React, { PropTypes } from 'react';

export default function Ranking(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>Classement des joueurs (pour la semaine)</h2>
            <ul className="RankingList">
                <li className="RankingItem">
                    <ul className="UserList">
                        <li className="UserItem">
                            <span className="avatar">
                            </span>
                            <span className="name">
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
            </ul>
            <ul className="RankingList">
                {
                    props.scoreByUser.map(user => (
                        <li key={user.displayName} className="RankingItem">
                            <ul className="UserList">
                                <li className="UserItem">
                                    <span className="avatar">
                                        <img src={user.avatar} width="40px" height="40px"/>
                                    </span>
                                    <span className="name">
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
