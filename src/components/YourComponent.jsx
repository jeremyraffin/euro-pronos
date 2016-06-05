import React, { Component, PropTypes } from 'react';

try {
    require('../css/main.css');
} catch (error) {
    console.log('can\'t import css.');
}

export default class YourComponent extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.props.callYourAction();
    }

    render() {
        return (
            <header style={{color: this.props.color}} onClick={this.onClick}>
                {this.props.appState.test}
            </header>
        );
    }
}

YourComponent.defaultProps = {
    color: 'black'
};

YourComponent.propTypes = {
    color: PropTypes.string
};
