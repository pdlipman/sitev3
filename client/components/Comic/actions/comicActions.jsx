export const OPEN_COMIC = 'OPEN_COMIC';
export const FETCH_COMICS_REQUEST = 'FETCH_COMICS_REQUEST';
export const FETCH_COMICS_SUCCESS = 'FETCH_COMICS_SUCCESS';
export const FETCH_COMICS_ERROR = 'FETCH_COMICS_ERROR';

export function openComic({ id }) {
    return {
        type: OPEN_COMIC,
        id,
    };
}

export function fetchComicsRequest() {
    return {
        type: 'FETCH_COMICS_REQUEST',
    };
}

export function fetchComicsSuccess(payload) {
    return {
        type: 'FETCH_COMICS_SUCCESS',
        payload,
    };
}

export function fetchComicsError() {
    return {
        type: 'FETCH_COMICS_ERROR',
    };
}
