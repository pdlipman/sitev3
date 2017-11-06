import React from 'react';
import { shallow } from 'enzyme';

import IconHeader from '../IconHeader';

function shallowWrapper() {
    return shallow(
        <IconHeader
            contents='Test Contents'
            iconName='home'
        />,
    );
}

describe('IconHeader.jsx', () => {
    test('IconHeader should render properly', () => {
        const wrapper = shallowWrapper();
        expect(wrapper).toMatchSnapshot();
    });

    test('IconHeader render should throw error', () => {
        expect(() => {
            shallow(<IconHeader />);
        }).toMatchSnapshot();
    });
});
