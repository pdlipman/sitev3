import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import AddCard, { __RewireAPI__ as RewireApi } from '../AddCard.jsx';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const testState = {
    content: {
        error: '',
    },
};

const store = mockStore(testState);

function shallowWrapper(props) {
    const wrapper = shallow(
        <AddCard
            store={store}
            handleSubmit={() => {}}
            {...props}
        />,
    );
    return wrapper;
}

describe('AddCard.jsx', () => {
    test('AddCard should render properly', () => {
        const handleAddNewCard = () => {};
        const wrapper = shallowWrapper({ handleAddNewCard });
        expect(wrapper).toMatchSnapshot();
    });
});
