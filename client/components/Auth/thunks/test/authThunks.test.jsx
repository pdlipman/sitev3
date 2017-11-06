import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    API_URL,
    logoutUser,
    errorHandler,
    loginUser,
    registerUser,
    protectedTest,
} from '../authThunks.jsx';

import * as authActions from '../../actions/authActions.jsx';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('contentThunks', () => {
    test('authThunks logoutUser', () => {
        const store = mockStore({});
        const expectedPayload = [
            {
                type: authActions.UNAUTH_USER,
            },
        ];
        store.dispatch(logoutUser());
        expect(store.getActions()).toEqual(expectedPayload);
    });

    test('contentThunk errorHandler', () => {
        const store = mockStore({});
        const errorMessage = 'Test: errorMessage';
        const errorData = { data: 'Test: error.data' };
        const errorDataError = { data: { error: 'Test: error.data.error' } };
        const errorStatus = { status: 401 };

        errorHandler(
            store.dispatch,
            errorMessage,
            authActions.AUTH_USER,
        );
        let expectedPayload = [
            {
                type: authActions.AUTH_USER,
                payload: errorMessage,
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);

        store.clearActions();
        errorHandler(
            store.dispatch,
            errorData,
            authActions.AUTH_USER,
        );
        expectedPayload = [
            {
                type: authActions.AUTH_USER,
                payload: errorData.data,
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);

        store.clearActions();
        errorHandler(
            store.dispatch,
            errorDataError,
            authActions.AUTH_USER,
        );
        expectedPayload = [
            {
                type: authActions.AUTH_USER,
                payload: errorDataError.data.error,
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);

        store.clearActions();
        errorHandler(
            store.dispatch,
            errorStatus,
            authActions.AUTH_USER,
        );
        expectedPayload = [
            {
                type: authActions.AUTH_USER,
                payload: 'You are not authorized to do this. Please login and try again.',
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);
    });

    test('authThunk loginUser', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);
        const testUser = {
            id: 1,
            name: 'Test Name',
        };
        const expectedPayload = [
            {
                type: authActions.AUTH_USER,
                user: testUser,
            },
        ];

        mockAxios
            .onPost(`${API_URL}/auth/login`)
            .reply(200,
                {
                    user: testUser,
                    token: 'test',
                },
            );
        store
            .dispatch(loginUser({}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedPayload);
            });
    });

    test('authThunk loginUser throws error', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);

        mockAxios
            .onPost(`${API_URL}/auth/login`)
            .networkError();

        store
            .dispatch(loginUser({}))
            .catch((error) => {
                expect(error);
            });
    });

    // test('authThunk registerUser', () => {
    //     const store = mockStore({});
    //     const mockAxios = new MockAdapter(axios);
    //     const testUser = {
    //         id: 1,
    //         name: 'Test Name',
    //     };
    //     const expectedPayload = [
    //         {
    //             type: authActions.AUTH_USER,
    //             user: testUser,
    //         },
    //     ];
    //
    //     mockAxios
    //         .onPost(`${API_URL}/auth/register`)
    //         .reply(200,
    //             {
    //                 user: testUser,
    //             },
    //         );
    //     store
    //         .dispatch(registerUser({}))
    //         .then(() => {
    //             expect(store.getActions()).toEqual(expectedPayload);
    //         });
    // });
    //
    // test('authThunk registerUser throws error', () => {
    //     const store = mockStore({});
    //     const mockAxios = new MockAdapter(axios);
    //
    //     mockAxios
    //         .onPost(`${API_URL}/auth/register`)
    //         .networkError();
    //
    //     store
    //         .dispatch(registerUser({}))
    //         .catch(() => {
    //             const mockErrorHandler = jest.fn();
    //             expect(mockErrorHandler).toHaveBeenCalled();
    //         });
    // });

    test('authThunk protectedTest', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);
        const testPayload = 'Test Payload';
        const expectedPayload = [
            {
                type: authActions.PROTECTED_TEST,
                payload: testPayload,
            },
        ];

        mockAxios
            .onGet(`${API_URL}/protected`)
            .reply(200,
                {
                    content: testPayload,
                },
            );
        store
            .dispatch(protectedTest({}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedPayload);
            });
    });

    test('authThunk registerUser throws error', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);

        mockAxios
            .onPost(`${API_URL}/protected`)
            .networkError();

        store
            .dispatch(protectedTest({}))
            .catch(() => {
                const mockErrorHandler = jest.fn();
                expect(mockErrorHandler).toHaveBeenCalled();
            });
    });
});
