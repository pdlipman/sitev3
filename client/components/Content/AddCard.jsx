import React from 'react';
import PropTypes from 'prop-types';

import 'font-awesome/css/font-awesome.css';
import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-command-styles.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { addNewCard } from './thunks/contentThunks.jsx';
import {
    renderField,
    mdeEditorField,
} from '../FormComponents/formComponents.jsx';

import './AddCard.css';

const mapStateToProps = state => (() => {
    const initialValues = {
        mdContent: {
            text: '',
            selection: null,
        },
    };
    return {
        initialValues,
        errorMessage: state.content.error,
    };
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

    constructor() {
        super();
        this.state = {
            reactMdeValue: { text: '', selection: null },
        };
    }

    handleAddCardSubmit = (formProps) => {
        const { handleAddNewCard } = this.props;
        handleAddNewCard(
            {
                label: formProps.label,
                content: formProps.mdContent.text,
            });
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
                            <label htmlFor='label'>Label</label>
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
                            <label htmlFor='mdContent'>Content</label>
                        </div>
                        <Field
                            name='mdContent'
                            className='markdown-body'
                            component={mdeEditorField}
                        />
                    </div>
                    <button type='submit'>Save</button>
                </form>
            </div>
        );
    }
}
