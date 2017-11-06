import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import AddCard, { __RewireAPI__ as AddCardRewireApi } from '../AddCard.jsx';
import { shallowUntilTarget } from '../../../utils/testUtils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const testStateInitial = {
    content: {
        error: '',
    },
};

const testStateWithError = {
    content: {
        error: 'Test: error message',
    },
};

function shallowWrapper(props, testState = testStateInitial) {
    const store = mockStore(testState);
    const wrapper = shallowUntilTarget(
        <AddCard
            store={store}
            handleSubmit={() => {}}
            handleAddNewCard={() => {}}
            {...props}
        />,
        'AddCard',
    );
    return wrapper;
}

describe('AddCard.jsx', () => {
    test('AddCard should render properly', () => {
        const wrapper = shallowWrapper({});
        expect(wrapper).toMatchSnapshot();
    });

    test('AddCard should render with error properly', () => {
        const wrapper = shallowWrapper({}, testStateWithError);
        expect(wrapper).toMatchSnapshot();
    });

    test('AddCard.handleAddCardSubmit', () => {
        const mockAddCard = jest.fn();

        AddCardRewireApi.__Rewire__('addNewCard', () => mockAddCard); // eslint-disable-line no-underscore-dangle

        const wrapper = shallowWrapper();
        wrapper.instance().handleAddCardSubmit({ val: 'hello world' });
        expect(mockAddCard).toHaveBeenCalled();
        AddCardRewireApi.__ResetDependency__('addNewCard'); // eslint-disable-line no-underscore-dangle
    });
});
