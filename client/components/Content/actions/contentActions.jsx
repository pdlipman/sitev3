export const GET_CARDS = 'GET_CARDS';
export const CONTENT_ERROR = 'CONTENT_ERROR';

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
