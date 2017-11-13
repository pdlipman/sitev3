import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';

import ReactMde, { ReactMdeCommands } from 'react-mde';

import { addNewCard } from './thunks/contentThunks.jsx';
import { renderField } from '../FormComponents/formComponents.jsx';

import 'font-awesome/css/font-awesome.css';
import 'react-mde/lib/styles/css/react-mde.css';
import 'react-mde/lib/styles/css/react-mde-command-styles.css';


import './AddCard.css';
import mdtest from '../../../assets/content/mdtest.md';

const mapStateToProps = state => (() => {
    const initialValues = {
        content: {
            text: mdtest,
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
                content: formProps.content.text
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
                            <label htmlFor='content'>Content</label>
                        </div>
                        <Field
                            name='content'
                            className='markdown-body'
                            component={(props) => {
                                return (
                                    <ReactMde
                                        value={props.input.value}
                                        onChange={param => props.input.onChange(param)}
                                        commands={ReactMdeCommands}
                                        textAreaProps={{
                                            id: 'ta1',
                                            name: 'ta1',
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
                    <div>
                        {/*<ReactMde*/}
                        {/*textAreaProps={{*/}
                        {/*id: 'ta1',*/}
                        {/*name: 'ta1',*/}
                        {/*}}*/}
                        {/*value={this.state.reactMdeValue}*/}
                        {/*onChange={this.handleValueChange}*/}
                        {/*commands={ReactMdeCommands}*/}
                        {/*/>*/}
                    </div>
                    <button type='submit'>Save</button>
                </form>
            </div>
        );
    }
}
