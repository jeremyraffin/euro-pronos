import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');

import Day from './partials/Day.jsx';
import MatchList from './partials/MatchList.jsx';

export default function Calendar(props) {
    const { matchs } = props;

    let dates = [];

    if (matchs) {
        dates = ([...new Set(matchs.map(match =>
            moment(match.date).format('L')
        ))].map(date =>
            matchs.filter(match => moment(match.date).format('L') === date)
        ));
    }
    return (
        <div className="Calendar">
            {
                dates.length > 0 ?
                    dates.map(date => {
                        return (
                            <Day key={date[0].date} date={date[0].date}>
                                <MatchList matchs={date} />
                            </Day>
                        );
                }) : 'Loading'
            }
        </div>
    );
}

Calendar.defaultProps = {
    matchs: []
};

Calendar.propTypes = {
    matchs: PropTypes.arrayOf(PropTypes.object)
};
