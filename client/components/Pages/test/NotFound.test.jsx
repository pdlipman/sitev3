import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../NotFound.jsx';

describe('Pages/NotFound.jsx', () => {
    test('NotFound should render properly', () => {
        const wrapper = shallow(
            <NotFound>Hello Jest!</NotFound>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
