import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function RequireAuth(ComposedComponent) {
    const mapStateToProps = state => ({
        authenticated: state.auth.authenticated,
    });

    class Authentication extends React.Component {
        static propTypes = {
            authenticated: PropTypes.bool.isRequired,
        };

        static contextTypes = {
            router: PropTypes.object,
        };

        componentWillMount() {
            if (!this.props.authenticated) {
                // router.push('/login');
                window.location.href = '/#/login';
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                // router.push('/login');
                window.location.href = '/#/login';
            }
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                />
            );
        }
    }

    return connect(mapStateToProps)(Authentication);
}
