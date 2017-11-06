import {
    authenticateUser,
    authenticationError,
    unauthenticateUser,
    protectedTest,
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    PROTECTED_TEST,
} from '../authActions';

describe('actions', () => {
    it('should create an action to authenticate user', () => {
        const testUser = {
            id: 1,
            name: 'Test User',
        };

        const expectedAction = {
            type: AUTH_USER,
            user: testUser,
        };

        expect(authenticateUser(testUser)).toEqual(expectedAction);
    });

    it('should create an action to throw an authentication error', () => {
        const testPayload = {
            id: 1,
            content: 'test payload 1',
        };

        const expectedAction = {
            type: AUTH_ERROR,
            payload: testPayload,
        };

        expect(authenticationError(testPayload)).toEqual(expectedAction);
    });

    it('should create an action to unauthenticate a user', () => {
        const expectedAction = {
            type: UNAUTH_USER,
        };

        expect(unauthenticateUser()).toEqual(expectedAction);
    });

    it('should create an action to run a protected test', () => {
        const testPayload = {
            id: 1,
            content: 'test payload 1',
        };

        const expectedAction = {
            type: PROTECTED_TEST,
            payload: testPayload,
        };

        expect(protectedTest(testPayload)).toEqual(expectedAction);
    });
});
