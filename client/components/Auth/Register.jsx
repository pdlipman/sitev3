import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { registerUser } from './thunks/authThunks.jsx';
import { renderField } from '../FormComponents/formComponents.jsx';

const mapStateToProps = state => ({
    errorMessage: state.auth.error,
    message: state.auth.message,
});

const mapDispatchToProps = dispatch => ({
    register: bindActionCreators(registerUser, dispatch),
});

export function validate(formProps) {
    const errors = {};

    if (!formProps.firstName) {
        errors.firstName = 'Please enter a first name.';
    }

    if (!formProps.lastName) {
        errors.lastName = 'Please enter a last name.';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email address.';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password.';
    }

    return errors;
}

const form = {
    form: 'register',
    validate,
};

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm(form)
export default class Register extends React.Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        handleSubmit: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,
    };

    static defaultProps = {
        errorMessage: '',
    };

    handleRegisterSubmit = (formProps) => {
        const { register } = this.props;
        register(formProps);
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
                    onSubmit={handleSubmit(this.handleRegisterSubmit)}
                >
                    <div className='row'>
                        <div className='column'>
                            <label htmlFor='firstName'>First Name</label>
                            <Field
                                name='firstName'
                                className='form-control'
                                component={renderField}
                                type='text'
                            />
                        </div>
                        <div className='column'>
                            <label htmlFor='lastName'>Last Name</label>
                            <Field
                                name='lastName'
                                className='form-control'
                                component={renderField}
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            <label htmlFor='email'>Email</label>
                            <Field
                                name='email'
                                className='form-control'
                                component={renderField}
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
                                component={renderField}
                                type='password'
                            />
                        </div>
                    </div>
                    <button type='submit'>Register</button>
                </form>
            </div>
        );
    }
}
