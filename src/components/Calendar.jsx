import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');

import Day from './partials/Day.jsx';
import MatchList from './partials/MatchList.jsx';

export default function Calendar(props) {
    const { matchsByDate } = props;
    return (
        <div className="Calendar">
            {
                matchsByDate.length > 0 ?
                    matchsByDate.map(date => {
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
    matchsByDate: []
};

Calendar.propTypes = {
    matchsByDate: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object))
};
