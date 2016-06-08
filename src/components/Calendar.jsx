import React, { PropTypes } from 'react';
import moment from 'moment';

moment.locale('fr');

export default function Calendar(props) {

    const { appState } = props;

    let dates = [];

    if (appState.matchs) {
        dates = ([...new Set(appState.matchs.map(match =>
            moment(match.date).format('L')
        ))].map(date =>
            appState.matchs.filter(match => moment(match.date).format('L') === date)
        ));
    }
    return (
        <div className="Calendar">
            {
                dates.length > 0 ?
                    dates.map(date => {
                        return (
                            <section key={date[0].date} className="Day">
                                <header>
                                    <h2>
                                        <time dateTime={moment(date[0].date).format('LL')}>
                                            {moment(date[0].date).format('dddd')} {moment(date[0].date).format('LL')}
                                        </time>
                                    </h2>
                                </header>
                                <ul className="MatchList">
                                    {
                                        date.map(match => {
                                            return (
                                                <li key={match.date} className="MatchItem">
                                                    <time dateTime={moment(match.date).format('LT')}>
                                                        {moment(match.date).format('LT')}
                                                    </time>
                                                    <ul className="TeamList">
                                                        <li className="TeamItem">
                                                            <span className="team">
                                                                {match.team1.name}
                                                            </span>
                                                            <span className="score">
                                                                {match.team1.score ? match.team1.score : ''}
                                                            </span>
                                                        </li>
                                                        -
                                                        <li className="TeamItem">
                                                            <span className="score">
                                                                {match.team2.score ? match.team2.score : ''}
                                                            </span>
                                                            <span className="team">
                                                                {match.team2.name}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <span className="UserScore"></span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </section>
                        );
                }) : 'Loading'
            }
        </div>
    );
}

Calendar.defaultProps = {

};

Calendar.propTypes = {

};
