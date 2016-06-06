import React, { PropTypes } from 'react';

export default function Ranking() {

    return (
        <div>Ranking</div>
    );
}

Ranking.defaultProps = {
    color: 'black'
};

Ranking.propTypes = {
    color: PropTypes.string
};
