import React, { PropTypes } from 'react';

function mergeBet(event, oldBet, match) {
    return Object.assign({}, oldBet, {
        id: match.id,
        [event.target.name]: {
            name: match[event.target.name].name,
            score: event.target.value
        }
    });
}

function Bet(props) {
    const { match, bet, handleChange } = props;
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <label>{match.team1.name}</label>
            <input
                name="team1"
                type="number"
                value={bet && bet.team1 ? bet.team1.score : ''}
                onChange={(event) => handleChange(mergeBet(event, bet, match))} />
            <input
                name="team2"
                type="number"
                value={bet && bet.team2 ? bet.team2.score : ''}
                onChange={(event) => handleChange(mergeBet(event, bet, match))} />
            <label>{match.team2.name}</label>
            { bet && bet.team2.score && bet.team1.score ? <div style={{color: 'green'}}>Validated</div> : ''}
        </div>
    );
}

export default Bet;
