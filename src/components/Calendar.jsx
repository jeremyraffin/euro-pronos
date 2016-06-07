import React, { PropTypes } from 'react';
import moment from 'moment';

export default function Calendar(props) {

    const { appState } = props;

    if (appState.matchs) {
        const dates = ([...new Set(appState.matchs.map(match =>
            moment(match.date).format('YYYY-MM-DD')
        ))].map(date =>
            appState.matchs.filter(match => moment(match.date).format('YYYY-MM-DD') === date)
        ));

        dates.map(date => {
            console.log(date);
        })
    }
    return (
        <div>
            <section>
                <header>
                    <h2><time dateTime="2016-06-10">Vendredi 10 juin</time></h2>
                </header>
                <ul>
                    <li>
                        <time dateTime="21:00">21h</time>
                        <div className="match">
                            <ul>
                                <li>
                                    <span className="team">France</span>
                                    <span className="score"></span>
                                </li>
                                <li>
                                    <span className="team">Roumanie</span>
                                    <span className="score"></span>
                                </li>
                            </ul>
                        </div>
                        <span className="score"></span>
                    </li>
                </ul>
            </section>
        </div>
    );
}

Calendar.defaultProps = {

};

Calendar.propTypes = {

};
