import React, { PropTypes } from 'react';

export default function Calendar() {

    return (
        <div>Calendar</div>
    );
}

Calendar.defaultProps = {
    color: 'black'
};

Calendar.propTypes = {
    color: PropTypes.string
};
