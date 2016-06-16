import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');

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
    return moment() >= moment(matchDate).subtract(5, 'minute');
}

export default function BetItem(props) {
    const betIsClosed = checkDate(props.match.date);
    const onChange = betIsClosed ? () => {} : (event) => props.handleChange(mergeBet(event, props.bet, props.match));
    return (
        <li key={props.match.date} className="MatchItem">
            <time dateTime={moment(props.match.date).format('LT')}>
                {moment(props.match.date).format('LT')}
            </time>
            <ul className="TeamList">
                <li className="TeamItem">
                    <label htmlFor={props.match.team1.name} className="team">
                        {props.match.team1.name}
                    </label>
                    <span className="score">
                        <input
                            id={props.match.team1.name}
                            className={betIsClosed ? 'disabled' : ''}
                            name="team1"
                            type="number"
                            min="0"
                            value={Number.isInteger(props.bet.team1.score) ? props.bet.team1.score : ''}
                            onChange={onChange}
                            disabled={betIsClosed}
                        />
                    </span>
                </li>
                -
                <li className="TeamItem">
                    <span className="score">
                        <input
                            id={props.match.team2.name}
                            className={betIsClosed ? 'disabled' : ''}
                            name="team2"
                            type="number"
                            min="0"
                            value={Number.isInteger(props.bet.team2.score) ? props.bet.team2.score : ''}
                            onChange={onChange}
                            disabled={betIsClosed} />
                    </span>
                    <label htmlFor={props.match.team2.name} className="team">
                        {props.match.team2.name}
                    </label>
                </li>
            </ul>
            <span className="Validation">
                { Number.isInteger(props.bet.team2.score) && Number.isInteger(props.bet.team1.score) ? <span className="icon-check-circle-o"></span> : '' }
            </span>

        </li>
    );
}

BetItem.propTypes = {
    match: PropTypes.object,
    bet: PropTypes.object,
    handleChange: PropTypes.func
};
