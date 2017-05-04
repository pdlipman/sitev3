import React from 'react';
import { Image } from 'semantic-ui-react';
import dev from '../../../assets/images/dev.jpg';
import IconHeader from '../Layout/Header/IconHeader.jsx';

const Book = () => (
    <div>
        <IconHeader
            contents='book'
            headerTag='h2'
            iconName='book'
            subHeader={'Comic Books'}
        />
        Comic Book test page.
        <Image
            src={dev}
            size='large'
        />
    </div>
);

export default Book;
