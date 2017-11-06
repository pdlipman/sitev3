import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { shallowUntilTarget } from '../testUtils.jsx';
import MockComponent from '../../../__mocks__/MockComponent.jsx';
import MockWrappedComponent from '../../../__mocks__/MockWrappedComponent.jsx';

describe('testUtils helper functions', () => {
    test('testutils.shallowUntilTarget should render', () => {
        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});
        const wrapper = shallowUntilTarget(
            <MockWrappedComponent
                store={store}
            />,
            'MockWrappedComponent',
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('testutils.shallowUntilTarget should throw error', () => {
        expect(() => {
            shallowUntilTarget(
                <MockComponent />,
                'MockComponent',
            );
        }).toThrowError('Cannot unwrap this component because it is not wrapped');
    });

    test('testutils.shallowUntilTarget should throw error', () => {
        const middlewares = [thunk];
        const mockStore = configureStore(middlewares);
        const store = mockStore({});
        const componentInstance = (
            <MockWrappedComponent
                store={store}
            />
        );
        const TargetComponent = 'NotARealComponent';
        const maxTries = 5;
        expect(() => {
            shallowUntilTarget(
                componentInstance,
                TargetComponent,
                {
                    maxTries,
                },
            );
        }).toThrowError(`Could not find ${TargetComponent} in React instance:${componentInstance}; gave up after ${maxTries} tries`);
    });
});
