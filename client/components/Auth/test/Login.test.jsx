import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import Login, { __RewireAPI__ as LoginRewireApi } from '../Login.jsx';
import { shallowUntilTarget } from '../../../utils/testUtils';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const testStateInitial = {
    auth: {
        error: '',
    },
};

const testStateWithError = {
    auth: {
        error: 'Test: error message',
    },
};

function shallowWrapper(props, testState = testStateInitial) {
    const store = mockStore(testState);
    const wrapper = shallowUntilTarget(
        <Login
            store={store}
            handleSubmit={() => {}}
            login={() => {}}
            {...props}
        />,
        'Login',
    );
    return wrapper;
}

describe('Login.jsx', () => {
    test('Login should render properly', () => {
        const wrapper = shallowWrapper({});
        expect(wrapper).toMatchSnapshot();
    });

    test('Login should render with error properly', () => {
        const wrapper = shallowWrapper({}, testStateWithError);
        expect(wrapper).toMatchSnapshot();
    });

    test('Login.handleLoginSubmit', () => {
        const mockLoginUser = jest.fn();

        LoginRewireApi.__Rewire__('loginUser', () => mockLoginUser); // eslint-disable-line no-underscore-dangle

        const wrapper = shallowWrapper();
        wrapper.instance().handleLoginSubmit({ val: 'hello world' });
        expect(mockLoginUser).toHaveBeenCalled();
        LoginRewireApi.__ResetDependency__('loginUser'); // eslint-disable-line no-underscore-dangle
    });
});
