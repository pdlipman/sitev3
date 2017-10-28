import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home.jsx';

describe('Pages/Home.jsx', () => {
    test('Home should render properly', () => {
        const wrapper = shallow(
            <Home>Hello Jest!</Home>,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
