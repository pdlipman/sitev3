import React from 'react';

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
