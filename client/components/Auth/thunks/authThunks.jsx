import axios from 'axios';
import Cookies from 'universal-cookie';

import * as authActionCreators from '../actions/authActions.jsx';

const API_URL = 'http://tranquil-plains-96188.herokuapp.com/api';

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if (error.data.error) {
        errorMessage = error.data.error;
    } else if (error.data) {
        errorMessage = error.data;
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
    return (dispatch) => {
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then((response) => {
                const cookie = new Cookies();
                cookie.set('token', response.data.token, { path: '/' });
                cookie.set('user', response.data.user, { path: '/' });
                dispatch(authActionCreators.authenticateUser());
                window.location.href = '/#/dashboard';
            })
            .catch(error => errorHandler(dispatch, error.response, authActionCreators.AUTH_ERROR));
    };
}

export function registerUser({ email, firstName, lastName, password }) {
    return (dispatch) => {
        axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
            .then((response) => {
                const cookie = new Cookies();
                cookie.set('token', response.data.token, { path: '/' });
                cookie.set('user', response.data.user, { path: '/' });
                dispatch(authActionCreators.authenticateUser());
            })
            .catch(error => errorHandler(dispatch, error.response, authActionCreators.AUTH_ERROR));
    };
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(authActionCreators.unauthenticateUser());
        const cookie = new Cookies();
        cookie.remove('token', { path: '/' });
        cookie.remove('user', { path: '/' });
    };
}

export function protectedTest() {
    return (dispatch) => {
        axios.get(`${API_URL}/protected`, { headers: { Authorization: cookie.load('token') }, })
            .then(response => dispatch(authActionCreators.protectedTest(response.data.content)))
            .catch(error => errorHandler(dispatch, error.response, authActionCreators.AUTH_ERROR));
    };
}