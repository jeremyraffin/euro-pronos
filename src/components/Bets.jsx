import React, { PropTypes } from 'react';

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

function mergeBets(bets, match, score, newBet) {
    return {bets: [...bets.filter(bet => bet.id !== match.id), newBet], score};
}

export default function Bets(props) {
    const { matchs, bets, score, handleChange } = props;
    return (
        <div>
            <h2>Bets</h2>
            <div>score: {score}</div>
            <div>
                {
                    matchs.map(match => (
                        <Bet match={match}
                            bet={getBetByMatch(match, bets)}
                            handleChange={(newBet) => handleChange(mergeBets(bets, match, score, newBet))} />
                        )
                    )
                }
            </div>
        </div>
    );
}

Bets.defaultProps = {
    matchs: [],
    score: 0,
    bets: [],
    handleChange: () => {}
};

Bets.propTypes = {
    matchs: PropTypes.arrayOf(PropTypes.object),
    score: PropTypes.number,
    bets: PropTypes.arrayOf(PropTypes.object),
    handleChange: PropTypes.func
};
