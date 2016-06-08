import React, { PropTypes } from 'react';

import Bet from './Bet.jsx';

function getBetByMatch(match, bets) {
    return bets.find((bet) => match.id === bet.id);
}

function mergeBets(bets, match, score, newBet) {
    return {bets: [...bets.filter(bet => bet.id !== match.id), newBet], score};
}

export default function Bets(props) {
    const { matchs, bets, score, handleChange } = props;
    return (
        <div>
            <h2>Bets</h2>
            <div>
                {
                    matchs.map(match => (
                        <Bet match={match}
                            bet={getBetByMatch(match, bets)}
                            handleChange={(newBet) => handleChange(match.id, mergeBets(bets, match, score, newBet))} />
                        )
                    )
                }
            </div>
        </div>
    );
}

Bets.defaultProps = {
};

Bets.propTypes = {
};
