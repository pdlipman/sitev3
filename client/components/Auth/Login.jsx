import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { loginUser } from './thunks/authThunks.jsx';

const mapStateToProps = state => ({
    errorMessage: state.auth.error,
    message: state.auth.message,
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
        message: PropTypes.string,
        login: PropTypes.func.isRequired,
    };

    static defaultProps = {
        errorMessage: '',
        message: '',
    };

    handleLoginSubmit = (formProps) => {
        const { login } = this.props;
        login(formProps);
    };

    renderError(errorMessage) {
        return (
            <div>
                <span><strong>Error:</strong> { errorMessage } </span>
            </div>
        );
    }

    render() {
        const {
            handleSubmit,
            errorMessage,
        } = this.props;

        return (
            <div>
                { errorMessage && this.renderError(errorMessage)}
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
