import React from 'react';
import { Image } from 'semantic-ui-react';
import dev from '../../../assets/images/dev.jpg';

const Book = () => (
    <div>
        Book test page.
        <Image
            src={dev}
            size='large'
        />
    </div>
);

export default Book;
