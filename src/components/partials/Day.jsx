import React, { PropTypes } from 'react';
import moment from 'moment';
moment.locale('fr');

export default function Day(props) {

    return (
        <section className="Day">
            <header>
                <h2>
                    <time dateTime={moment(props.date).format('LL')}>
                        {moment(props.date).format('dddd')} {moment(props.date).format('LL')}
                    </time>
                </h2>
            </header>
            {props.children}
        </section>
    );
}

Day.defaultProps = {

};

Day.propTypes = {

};
