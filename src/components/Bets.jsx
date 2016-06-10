import React, { PropTypes } from 'react';

import Day from './partials/Day.jsx';
import Bet from './Bet.jsx';

function getBetByMatch(match, bets) {
    const targetedBet = bets.find((bet) => match.id === bet.id);
    if (targetedBet) {
        return targetedBet;
    }
    return {
        id: match.id,
        team1: {
            score: ''
        },
        team2: {
            score: ''
        }
    };
}

function mergeBets(userData, match, newBet) {
    return {bets: [...userData.bets.filter(bet => bet.id !== match.id), newBet], score: userData.score, displayName: userData.displayName, avatar: userData.avatar};
}

export default function Bets(props) {
    const { matchsByDate, userData, handleChange } = props;

    return (
        <div>
            <h2>Bets</h2>
            <div>score: {userData.score}</div>
            <div>
                {
                    matchsByDate.map(date => (
                            <Day key={date[0].date} date={date[0].date}>
                                {date.map(match => (
                                    <Bet match={match}
                                        bet={getBetByMatch(match, userData.bets)}
                                        handleChange={(newBet) => handleChange(mergeBets(userData, match, newBet))} />
                                ))}
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
