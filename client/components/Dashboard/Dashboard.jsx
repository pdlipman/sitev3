import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    user: state.auth.user,
});

@connect(mapStateToProps)
export default class Dashboard extends React.Component {
    static propTypes = {
        user: PropTypes.object,
    };

    renderContent() {
        const {
            user,
        } = this.props;

        return user ? <p>{user.role}</p> : '';
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
