import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { registerUser } from './thunks/authThunks.jsx';

const mapStateToProps = state => ({
    errorMessage: state.auth.error,
    message: state.auth.message,
});

const mapDispatchToProps = dispatch => ({
    register: bindActionCreators(registerUser, dispatch),
});

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input
            {...input}
            placeholder={label}
            type={type}
        />
        {touched && error && <span>{error}</span>}
    </div>
);

function validate(formProps) {
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

    console.log(errors);

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
        message: PropTypes.string,
        register: PropTypes.func.isRequired,
    };

    static defaultProps = {
        errorMessage: '',
        message: '',
    };

    static renderError(errorMessage) {
        return (
            <div>
                <span><strong>Error:</strong> { errorMessage } </span>
            </div>
        );
    }

    handleRegisterSubmit = (formProps) => {
        const { register } = this.props;
        register(formProps);
    };

    render() {
        const {
            handleSubmit,
            errorMessage,
        } = this.props;

        return (
            <div>
                { errorMessage && this.renderError(errorMessage)}
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

                </form>
            </div>
        );
    }

}
