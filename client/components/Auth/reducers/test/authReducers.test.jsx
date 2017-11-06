import authReducers from '../authReducers.jsx';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST,
} from '../../actions/authActions.jsx';

describe('actions', () => {
    it('should return the initial state', () => {
        const expectedState = {
            error: '',
            message: '',
            content: '',
            authenticated: false,
        };
        expect(authReducers(undefined, {})).toEqual(expectedState);
    });

    it('should handle AUTH_USER', () => {
        const testUser = 'Test User';
        const expectedState = {
            error: '',
            message: '',
            authenticated: true,
            user: testUser,
        };
        expect(
            authReducers([], {
                type: AUTH_USER,
                user: testUser,
            }),
        ).toEqual(expectedState);
    });

    it('should handle AUTH_ERROR', () => {
        const testError = 'Test: Content Error';
        const expectedState = {
            error: testError,
        };

        expect(
            authReducers([], {
                type: AUTH_ERROR,
                payload: testError,
            }),
        ).toEqual(expectedState);
    });

    it('should handle SET_SELECTED_CARD', () => {
        expect(
            authReducers([], {
                type: UNAUTH_USER,
            }),
        ).toEqual(
            {
                authenticated: false,
            },
        );
    });

    it('should handle PROTECTED_TEST', () => {
        const testContent = 'Test Content';
        const expectedState = {
            content: testContent,
        };

        expect(
            authReducers([], {
                type: PROTECTED_TEST,
                payload: testContent,
            }),
        ).toEqual(expectedState);
    });
});
