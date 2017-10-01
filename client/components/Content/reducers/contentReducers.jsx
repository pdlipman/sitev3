import {
    GET_CARDS,
    CONTENT_ERROR,
} from '../actions/contentActions.jsx';

const INITIAL_STATE = {
    cards: [],
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CARDS: {
            return {
                ...state,
                cards: action.cards,
            };
        }
        case CONTENT_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}
