import React from 'react';

import IconHeader from '../Layout/Header/IconHeader.jsx';

const Home = () => (
    <div>
        <IconHeader
            contents='Home'
            headerTag='h2'
            iconName='home'
            subHeader={'Welcome to my site!'}
        />
        This is the home page.
    </div>
);

export default Home;

