export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const UNAUTH_USER = 'UNAUTH_USER';
export const PROTECTED_TEST = 'PROTECTED_TEST';

export function authenticateUser() {
    return {
        type: AUTH_USER,
    };
}

export function authenticationError(payload) {
    return {
        type: AUTH_ERROR,
        payload,
    };
}

export function unauthenticateUser() {
    return {
        type: UNAUTH_USER,
    };
}

export function protectedTest(payload) {
    return {
        type: PROTECTED_TEST,
        payload,
    };
}
