import React, { PropTypes } from 'react';

function getMatchBet(match, userBets) {
    return userBets.find((matchBet) => match.id === matchBet.id);
}

function displayMatch(match, userBet, action) {
    return (
        <div>
            <label>{match.team1.name}</label>
            <input
                type="number"
                value={userBet && userBet.team1 ? userBet.team1.score : ''}
                onChange={(event) => action(Object.assign({}, userBet, {id: match.id, team1: {name: match.team1.name, score: event.target.value}}))} />
            <label>{match.team2.name}</label>
            <input
                type="number"
                value={userBet && userBet.team2 ? userBet.team2.score : ''}
                onChange={(event) => action(Object.assign({}, userBet, {id: match.id, team2: {name: match.team2.name, score: event.target.value}}))} />
        </div>
    );
}

export default function Bets(props) {
    return (
        <div>
            <h2>Bets</h2>
            <div>
                {
                    props.appData.map(
                        match => displayMatch(
                            match,
                            getMatchBet(match, props.userData.pronos),
                            (newBet) => props.setUserData(props.id, Object.assign({}, props.userData, {pronos: [...props.userData.pronos.filter(bet => bet.id !== match.id), newBet]}))
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
