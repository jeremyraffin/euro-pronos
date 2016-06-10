import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');

export default function MatchItem(props) {
    return (
        <li key={props.match.date} className="MatchItem">
            <time dateTime={moment(props.match.date).format('LT')}>
                {moment(props.match.date).format('LT')}
            </time>
            <ul className="TeamList">
                <li className="TeamItem">
                    <span className="team">
                        {props.match.team1 ? props.match.team1.name : ''}
                    </span>
                    <span className="score">
                        { props.match.team1 && Number.isInteger(props.match.team1.score) ? props.match.team1.score : '' }
                    </span>
                </li>
                -
                <li className="TeamItem">
                    <span className="score">
                        { props.match.team2 && Number.isInteger(props.match.team2.score) ? props.match.team2.score : '' }
                    </span>
                    <span className="team">
                        {props.match.team2 ? props.match.team2.name : ''}
                    </span>
                </li>
            </ul>
            <span className="UserScore"></span>
        </li>
    );
}

MatchItem.defaultProps = {

};

MatchItem.propTypes = {

};
