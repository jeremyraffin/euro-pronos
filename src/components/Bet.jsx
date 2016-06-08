import React, { PropTypes } from 'react';

function mergeBet(event, oldBet, match) {
    const score = Number.parseInt(event.target.value.trim(), 0);
    return Object.assign({}, oldBet, {
        id: match.id,
        [event.target.name]: {
            name: match[event.target.name].name,
            score: isNaN(score) ? '' : score
        }
    });
}

export default function Bet(props) {
    const { match, bet, handleChange } = props;
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <label>{match.team1.name}</label>
            <input
                name="team1"
                type="number"
                value={Number.isInteger(bet.team1.score) ? bet.team1.score : ''}
                onChange={(event) => handleChange(mergeBet(event, bet, match))} />
            <input
                name="team2"
                type="number"
                value={Number.isInteger(bet.team1.score) ? bet.team2.score : ''}
                onChange={(event) => handleChange(mergeBet(event, bet, match))} />
            <label>{match.team2.name}</label>
            { Number.isInteger(bet.team2.score) && Number.isInteger(bet.team1.score) ? <div style={{color: 'green'}}>Validated</div> : '' }
        </div>
    );
}

Bet.defaultProps = {
    match: {},
    bet: {},
    handleChange: () => {}
};

Bet.propTypes = {
    match: PropTypes.object,
    bet: PropTypes.object,
    handleChange: PropTypes.func
};
