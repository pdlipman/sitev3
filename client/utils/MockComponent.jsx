import React from 'react';
import PropTypes from 'prop-types';

export default class MockComponent extends React.Component {
    static propTypes = {
        mockProperty: PropTypes.string,
    };

    static defaultProps = {
        mockProperty: 'Mock Property',
    };

    render() {
        const { mockProperty } = this.props;
        return (
            <div>
                <p>Hello World: {mockProperty}</p>
            </div>
        );
    }
}
