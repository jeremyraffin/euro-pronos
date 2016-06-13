import React, { PropTypes } from 'react';

import Day from './partials/Day.jsx';
import BetList from './partials/BetList.jsx';

export default function Bets(props) {
    const { matchsByDate, userData, handleChange } = props;
    return (
        <div>
            <p>Les scores doivent être enregistrés au plus tard 1h avant le début de la rencontre</p>
            <div>score: {userData.score}</div>
            <div>
                {
                    matchsByDate.map(date => (
                            <Day key={date[0].date} date={date[0].date}>
                                <BetList
                                    matchs={date}
                                    userData={userData}
                                    handleChange={handleChange}
                                />
                            </Day>
                        )
                    )
                }
            </div>
        </div>
    );
}

Bets.defaultProps = {
    matchsByDate: [],
    userData: {},
    handleChange: () => {}
};

Bets.propTypes = {
    matchsByDate: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
    userData: PropTypes.object,
    handleChange: PropTypes.func
};
