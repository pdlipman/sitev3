import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import Register,
{
    __RewireAPI__ as RegisterRewireApi,
    validate,
} from '../Register.jsx';
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
        <Register
            store={store}
            handleSubmit={() => {}}
            register={() => {}}
            {...props}
        />,
        'Register',
    );
    return wrapper;
}

describe('Register.jsx', () => {
    test('Register should render properly', () => {
        const wrapper = shallowWrapper({});
        expect(wrapper).toMatchSnapshot();
    });

    test('Register should render with error properly', () => {
        const wrapper = shallowWrapper({}, testStateWithError);
        expect(wrapper).toMatchSnapshot();
    });

    test('Register.handleRegisterSubmit', () => {
        const mockRegisterUser = jest.fn();

        RegisterRewireApi.__Rewire__('registerUser', () => mockRegisterUser); // eslint-disable-line no-underscore-dangle

        const wrapper = shallowWrapper();
        wrapper.instance().handleRegisterSubmit({ val: 'hello world' });
        expect(mockRegisterUser).toHaveBeenCalled();
        RegisterRewireApi.__ResetDependency__('registerUser'); // eslint-disable-line no-underscore-dangle
    });

    test('Register static function validate', () => {
        const testErrors = validate({});
        const testFormProps = {
            firstName: 'First',
            lastName: 'Last',
            email: 'test@email.com',
            password: 'password',
        };
        const testEmptyErrors = validate(testFormProps);

        expect(testErrors).toMatchSnapshot();
        expect(testEmptyErrors).toMatchSnapshot();
    });
});
