import contentReducer from '../contentReducers.jsx';
import {
    GET_CARDS,
    CONTENT_ERROR,
    SET_SELECTED_CARD,
} from '../../actions/contentActions.jsx';

describe('actions', () => {
    it('should return the initial state', () => {
        const expectedState = {
            cards: [],
        };
        expect(contentReducer(undefined, {})).toEqual(expectedState);
    });

    it('should handle GET_CARDS', () => {
        const testCards = [
            {
                id: 1,
                content: 'test card 1',
            },
            {
                id: 2,
                content: 'test card 2',
            }];

        expect(
            contentReducer([], {
                type: GET_CARDS,
                cards: testCards,
            }),
        ).toEqual(
            {
                cards: testCards,
            },
        );
    });

    it('should handle CONTENT_ERROR', () => {
        const testError = 'Test: Content Error';

        expect(
            contentReducer([], {
                type: CONTENT_ERROR,
                payload: testError,
            }),
        ).toEqual(
            {
                error: testError,
            },
        );
    });

    it('should handle SET_SELECTED_CARD', () => {
        const testCardId = 1;

        expect(
            contentReducer([], {
                type: SET_SELECTED_CARD,
                cardId: testCardId,
            }),
        ).toEqual(
            {
                selectedCardId: testCardId,
            },
        );
    });
});
