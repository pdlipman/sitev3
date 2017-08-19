import React from 'react';

import IconHeader from '../Layout/Header/IconHeader.jsx';

const NotFound = () => (
    <div>
        <IconHeader
            contents='Page Not Found'
            headerTag='h2'
            iconName='info'
            subHeader={'The page you were looking for cannot be found.'}
        />
    </div>
);

export default NotFound;
