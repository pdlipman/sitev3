import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect()
export default class MockWrappedComponent extends React.Component {
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
