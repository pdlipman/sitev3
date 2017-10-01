import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { loginUser } from './thunks/authThunks.jsx';

const mapStateToProps = state => ({
    errorMessage: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
    login: bindActionCreators(loginUser, dispatch),
});

const form = {
    form: 'login',
};

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm(form)
export default class Login extends React.Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        handleSubmit: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
    };

    static defaultProps = {
        errorMessage: '',
    };

    handleLoginSubmit = (formProps) => {
        const { login } = this.props;
        login(formProps);
    };

    renderError() {
        const {
            errorMessage,
        } = this.props;
        return errorMessage && (
            <div>
                <span><strong>Error:</strong> { errorMessage } </span>
            </div>
        );
    }

    render() {
        const {
            handleSubmit,
        } = this.props;

        return (
            <div>
                { this.renderError()}
                <form
                    onSubmit={handleSubmit(this.handleLoginSubmit)}
                >
                    <div className='row'>
                        <div className='column'>
                            <label htmlFor='email'>Email</label>
                            <Field
                                name='email'
                                className='form-control'
                                component='input'
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            <label htmlFor='password'>Password</label>
                            <Field
                                name='password'
                                className='form-control'
                                component='input'
                                type='password'
                            />
                        </div>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        );
    }
}
