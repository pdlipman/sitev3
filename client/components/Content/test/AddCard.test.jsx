import React from 'react';
import { shallow } from 'enzyme';

import AddCard, { __RewireAPI__ as RewireApi } from '../AddCard.jsx';

describe('AddCard.jsx', () => {
    it('AddCard should render properly', () => {
        const wrapper = shallow(
            <AddCard

            />,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
