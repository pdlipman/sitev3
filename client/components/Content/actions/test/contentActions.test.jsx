import {
    getCards,
    contentError,
    setSelectedCard,
    GET_CARDS,
    CONTENT_ERROR,
    SET_SELECTED_CARD,
} from '../contentActions.jsx';

describe('actions', () => {
    it('should create an action to get cards', () => {
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
        const expectedAction = {
            type: GET_CARDS,
            cards: testCards,
        };

        expect(getCards(testCards)).toEqual(expectedAction);
    });

    it('should create an action to throw a content error', () => {
        const testPayload =
        {
            id: 1,
            content: 'test payload 1',
        };
        const expectedAction = {
            type: CONTENT_ERROR,
            payload: testPayload,
        };

        expect(contentError(testPayload)).toEqual(expectedAction);
    });

    it('should create an action to set a selected card', () => {
        const testCardId = 1;
        const expectedAction = {
            type: SET_SELECTED_CARD,
            cardId: testCardId,
        };

        expect(setSelectedCard(testCardId)).toEqual(expectedAction);
    });
});
