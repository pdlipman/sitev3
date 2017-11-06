export const GET_CARDS = 'GET_CARDS';
export const CONTENT_ERROR = 'CONTENT_ERROR';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';

export function getCards(cards) {
    return {
        type: GET_CARDS,
        cards,
    };
}

export function contentError(payload) {
    return {
        type: CONTENT_ERROR,
        payload,
    };
}

export function setSelectedCard(cardId) {
    return {
        type: SET_SELECTED_CARD,
        cardId,
    };
}
