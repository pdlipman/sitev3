import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { protectedTest } from '../Auth/thunks/authThunks.jsx';

const mapStateToProps = state => ({
    user: state.auth.user,
    content: state.auth.content,
});

const mapDispatchToProps = dispatch => ({
    protected: bindActionCreators(protectedTest, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends React.Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        protected: PropTypes.func.isRequired,
        user: PropTypes.shape(
            {
                _id: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                email: PropTypes.string,
                role: PropTypes.arrayOf(PropTypes.string),
            },
        ).isRequired,
    };

    componentWillMount() {
        this.props.protected();
    }

    renderContent() {
        const {
            content,
        } = this.props;

        return content ? <p>{content}</p> : '';
    }

    renderUser() {
        const {
            user,
        } = this.props;

        return user ? <p>{user.role}</p> : '';
    }

    render() {
        return (
            <div>
                DASHBOARD
                {this.renderUser()}
                {this.renderContent()}
            </div>
        );
    }
}
