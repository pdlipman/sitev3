import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function RequireAuth(ComposedComponent) {
    class Authentication extends React.Component {
        static propTypes = {
            authenticated: PropTypes.bool,
        };

        static contextTypes = {
            router: PropTypes.object,
        };

        componentWillMount() {
            const {
                router,
            } = this.context;

            if (!this.props.authenticated) {
                // router.push('/login');
                window.location.href = '/#/login';
            }
        }

        componentWillUpdate(nextProps) {
            const {
                router,
            } = this.context;

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
    const mapStateToProps = (state) => ({
        authenticated: state.auth.authenticated,
    });

    return connect(mapStateToProps)(Authentication);
}