import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST,
} from '../actions/authActions.jsx';

const INITIAL_STATE = {
    error: '',
    message: '',
    content: '',
    authenticated: false,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER: {
            return {
                ...state,
                error: '',
                message: '',
                authenticated: true,
                user: action.user,
            };
        }
        case AUTH_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case UNAUTH_USER: {
            return {
                authenticated: false,
            };
        }
        case PROTECTED_TEST: {
            return {
                ...state,
                content: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}