import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    content: state.auth.content,
});

@connect(mapStateToProps)
export default class Dashboard extends React.Component {
    static propTypes = {
        content: PropTypes.string,
    };

    renderContent() {
        const {
            content,
        } = this.props;

        return content ? <p>{content}</p> : '';
    }

    render() {
        return (
            <div>
                DASHBOARD
                {this.renderContent()}
            </div>
        );
    }
}
