import React, { PropTypes } from 'react';
import moment from 'moment';

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

function checkDate(matchDate) {
    return moment() >= moment(matchDate).subtract(1, 'hour');
}

export default function Bet(props) {
    const { match, bet, handleChange } = props;
    const betIsClosed = checkDate(match.date);
    const onChange = betIsClosed ? () => {} : (event) => handleChange(mergeBet(event, bet, match));
    return (
        <li key={match.date} className="MatchItem">
            <time dateTime={moment(props.match.date).format('LT')}>
                {moment(props.match.date).format('LT')}
            </time>
            <ul className="TeamList">
                <li className="TeamItem">
                    <span className="team">
                        {match.team1.name}
                    </span>
                    <span className="score">
                        <input
                            name="team1"
                            type="number"
                            value={Number.isInteger(bet.team1.score) ? bet.team1.score : ''}
                            onChange={onChange}
                            disabled={betIsClosed} />
                    </span>
                </li>
                -
                <li className="TeamItem">
                    <span className="score">
                        <input
                            name="team2"
                            type="number"
                            value={Number.isInteger(bet.team1.score) ? bet.team2.score : ''}
                            onChange={onChange}
                            disabled={betIsClosed} />
                    </span>
                    <span className="team">
                        {match.team2.name}
                    </span>
                </li>
                <li>
                    { Number.isInteger(bet.team2.score) && Number.isInteger(bet.team1.score) ? <div style={{color: 'green'}}>Validated</div> : '' }
                </li>
            </ul>
            <span className="UserScore"></span>
        </li>
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
