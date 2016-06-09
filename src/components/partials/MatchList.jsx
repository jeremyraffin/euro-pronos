import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');

import MatchItem from './MatchItem.jsx';

export default function MatchList(props) {

    return (
        <ul className="MatchList">
            {
                props.matchs.map(match => {
                    return (
                        <MatchItem match={match} />
                    )
                })
            }
        </ul>
    );
}

MatchList.defaultProps = {

};

MatchList.propTypes = {

};
