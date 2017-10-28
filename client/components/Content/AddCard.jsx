import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import { addNewCard } from './thunks/contentThunks.jsx';
import { renderField } from '../FormComponents/formComponents.jsx';

const mapStateToProps = state => ({
    errorMessage: state.content.error,
});

const mapDispatchToProps = dispatch => ({
    handleAddNewCard: bindActionCreators(addNewCard, dispatch),
});

const form = {
    form: 'addCard',
};

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm(form)
export default class AddCard extends React.Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        handleSubmit: PropTypes.func.isRequired,
        handleAddNewCard: PropTypes.func.isRequired,
    };

    static defaultProps = {
        errorMessage: '',
    };

    handleAddCardSubmit = (formProps) => {
        const { handleAddNewCard } = this.props;
        handleAddNewCard(formProps);
    };

    renderError() {
        const {
            errorMessage,
        } = this.props;
        return errorMessage && (
            <div>
                <span><strong>Error:</strong> {errorMessage} </span>
            </div>
        );
    }

    render() {
        const {
            handleSubmit,
        } = this.props;

        return (
            <div>
                {this.renderError()}
                <form
                    onSubmit={handleSubmit(this.handleAddCardSubmit)}
                >
                    <div className='row'>
                        <div className='column'>
                            <label htmlFor='email'>Label</label>
                            <Field
                                name='label'
                                className='form-control'
                                component={renderField}
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='column'>
                            <label htmlFor='password'>Content</label>
                            <Field
                                name='content'
                                className='form-control'
                                component={renderField}
                                type='textarea'
                            />
                        </div>
                    </div>
                    <button type='submit'>Save</button>
                </form>
            </div>
        );
    }
}
