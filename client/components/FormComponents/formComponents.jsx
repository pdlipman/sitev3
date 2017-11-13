/* eslint-disable react/prop-types */ // --> OFF
import React from 'react';
import ReactMde, { ReactMdeCommands } from 'react-mde';

export const renderField = (
    {
        input,
        label,
        type,
        meta: {
            touched,
            error,
        },
    },
) => (
    <div>
        <input
            {...input}
            placeholder={label}
            type={type}
        />
        {touched && error && <span>{error}</span>}
    </div>
);


export const mdeEditorField = props => (
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

/* eslint-enable react/prop-types */ // --> ON
