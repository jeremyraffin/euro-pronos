import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');

import BetItem from './BetItem.jsx';

function getBetByMatch(match, bets) {
    const targetedBet = bets ? bets.find((bet) => match.id === bet.id) : false;
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

export default function BetList(props) {
    return (
        <ul className="MatchList">
            {
                props.matchs.map(match => {
                    return (
                        <BetItem key={match.date}
                                 match={match}
                                 bet={getBetByMatch(match, props.userData.bets)}
                                 handleChange={(event) => props.handleChange(mergeBets(props.userData, match, event))}
                        />
                    )
                })
            }
        </ul>
    );
}

BetList.propTypes = {
    matchs: PropTypes.arrayOf(PropTypes.object),
    userData: PropTypes.object,
    handleChange: PropTypes.func,
};
