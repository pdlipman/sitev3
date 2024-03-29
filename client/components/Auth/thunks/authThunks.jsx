import axios from 'axios';
import Cookies from 'universal-cookie';

import * as authActionCreators from '../actions/authActions.jsx';

import {
    API_URL,
} from '../../../utils/config/config.jsx';

export function logoutUser() {
    return (dispatch) => {
        dispatch(authActionCreators.unauthenticateUser());
        const cookie = new Cookies();
        cookie.remove('token', { path: '/' });
        cookie.remove('user', { path: '/' });
    };
}

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if (error.data) {
        errorMessage = error.data.error || error.data;
    } else {
        errorMessage = error;
    }

    if (error.status === 401) {
        dispatch({
            type,
            payload: 'You are not authorized to do this. Please login and try again.',
        });
        logoutUser();
    } else {
        dispatch({
            type,
            payload: errorMessage,
        });
    }
}

export function loginUser({ email, password }) {
    return dispatch => axios
        .post(`${API_URL}/auth/login`, { email, password })
        .then((response) => {
            const cookie = new Cookies();
            const {
                token,
                user,
            } = response.data;
            cookie.set('token', token, { path: '/' });
            cookie.set('user', user, { path: '/' });
            dispatch(authActionCreators.authenticateUser(user));
            window.location.href = '/#/dashboard';
        })
        .catch(error => errorHandler(dispatch, error.response, authActionCreators.AUTH_ERROR));
}

export function registerUser({ email, firstName, lastName, password }) {
    return dispatch => axios
        .post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
        .then((response) => {
            const cookie = new Cookies();
            const {
                token,
                user,
            } = response.data;
            cookie.set('token', token, { path: '/' });
            cookie.set('user', user, { path: '/' });
            dispatch(authActionCreators.authenticateUser(user));
        })
        .catch(error => errorHandler(dispatch, error.response, authActionCreators.AUTH_ERROR));
}

export function protectedTest() {
    return (dispatch) => {
        const cookie = new Cookies();
        return axios
            .get(
                `${API_URL}/protected`,
                {
                    headers: {
                        Authorization: cookie.get('token'),
                    },
                },
            )
            .then(response => dispatch(authActionCreators.protectedTest(response.data.content)))
            .catch(error => errorHandler(dispatch, error.response, authActionCreators.AUTH_ERROR));
    };
}
