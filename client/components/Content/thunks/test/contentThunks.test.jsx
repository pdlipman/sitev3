import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
    API_URL,
    errorHandler,
    getCards,
    addNewCard,
    setSelectedCard,
} from '../contentThunks';

import * as contentActions from '../../actions/contentActions.jsx';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('contentThunks', () => {
    test('contentThunk errorHandler', () => {
        const store = mockStore({});
        const errorMessage = 'Test: errorMessage';
        const errorData = { data: 'Test: error.data' };
        const errorDataError = { data: { error: 'Test: error.data.error' } };
        const errorStatus = { status: 401 };

        errorHandler(
            store.dispatch,
            errorMessage,
            contentActions.SET_SELECTED_CARD,
        );
        let expectedPayload = [
            {
                type: contentActions.SET_SELECTED_CARD,
                payload: errorMessage,
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);

        store.clearActions();
        errorHandler(
            store.dispatch,
            errorData,
            contentActions.SET_SELECTED_CARD,
        );
        expectedPayload = [
            {
                type: contentActions.SET_SELECTED_CARD,
                payload: errorData.data,
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);

        store.clearActions();
        errorHandler(
            store.dispatch,
            errorDataError,
            contentActions.SET_SELECTED_CARD,
        );
        expectedPayload = [
            {
                type: contentActions.SET_SELECTED_CARD,
                payload: errorDataError.data.error,
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);

        store.clearActions();
        errorHandler(
            store.dispatch,
            errorStatus,
            contentActions.SET_SELECTED_CARD,
        );
        expectedPayload = [
            {
                type: contentActions.SET_SELECTED_CARD,
                payload: 'You are not authorized to do this. Please login and try again.',
            },
        ];
        expect(store.getActions()).toEqual(expectedPayload);
    });

    test('contentThunk getCards', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);
        const testCards = [
            {
                id: 1,
                content: 'test card 1',
            },
            {
                id: 2,
                content: 'test card 2',
            },
        ];
        const expectedPayload = [
            {
                type: contentActions.GET_CARDS,
                cards: testCards,
            },
        ];
        mockAxios
            .onGet(`${API_URL}/content/get-cards`)
            .reply(200,
                {
                    cards: testCards,
                },
            );

        store
            .dispatch(getCards())
            .then(() => {
                expect(store.getActions()).toEqual(expectedPayload);
            });
    });

    test('contentThunk getCards throws error', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);
        mockAxios
            .onGet(`${API_URL}/content/get-cards`)
            .networkError();

        store
            .dispatch(getCards())
            .catch(() => {
                const mockErrorHandler = jest.fn();
                expect(mockErrorHandler).toHaveBeenCalled();
            });
    });

    test('contentThunk addNewCard', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);
        const testCards = [
            {
                id: 1,
                content: 'test card 1',
            },
            {
                id: 2,
                content: 'test card 2',
            },
        ];

        mockAxios
            .onPost(`${API_URL}/content/add-card`)
            .reply(200,
                {
                    cards: testCards,
                },
            );

        store
            .dispatch(addNewCard({ label: 'Test label' }))
            .then(() => {
                const mockGetCards = jest.fn();
                expect(mockGetCards).toHaveBeenCalled();
            });
    });

    test('contentThunk addNewCard throws error', () => {
        const store = mockStore({});
        const mockAxios = new MockAdapter(axios);
        mockAxios
            .onPost(`${API_URL}/content/add-card`)
            .networkError();

        store
            .dispatch(addNewCard({ label: 'Test label' }))
            .catch(() => {
                const mockErrorHandler = jest.fn();
                expect(mockErrorHandler).toHaveBeenCalled();
            });
    });

    test('contentThunk setSelectedCard', () => {
        const testCardId = 1;
        const expectedPayload = [
            {
                type: contentActions.SET_SELECTED_CARD,
                cardId: testCardId,
            },
        ];
        const store = mockStore({});

        store.dispatch(setSelectedCard({ cardId: testCardId }));
        expect(store.getActions()).toEqual(expectedPayload);
    });
});
