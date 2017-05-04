import React from 'react';

import IconHeader from '../Layout/Header/IconHeader.jsx';

const About = () => (
    <div>
        <IconHeader
            contents='About'
            headerTag='h2'
            iconName='code'
            subHeader={'What\'s going on here?'}
        />
        This is the about page.
    </div>
);

export default About;
