import {
    OPEN_COMIC,
    FETCH_COMICS_REQUEST,
    FETCH_COMICS_SUCCESS,
} from '../actions/comicActions.jsx';

export const comic = (state = {}, action) => {
    switch (action.type) {
        case OPEN_COMIC: {
            return Object.assign({}, state, {
                openComicId: action.id,
                page: 1,
            });
        }
        case FETCH_COMICS_REQUEST: {
            return state;
        }
        case FETCH_COMICS_SUCCESS: {
            return Object.assign({}, state, {
                comics: action.payload,
            });
        }
        default: {
            return state;
        }
    }
};


