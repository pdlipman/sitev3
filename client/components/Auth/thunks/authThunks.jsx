import axios from 'axios';
import cookie from 'react-cookie';
import * as authActionCreators from '../actions/authActions.jsx';

const API_URL = 'http://tranquil-plains-96188.herokuapp.com/api';

export function errorHandler(dispatch, error) {
    if (error.status === 401) {
        const errorMessage = 'You are not authorized to do this. Please login and try again.';
        dispatch(authActionCreators.authenticationError(errorMessage));
        logoutUser();
    } else {
        let errorMessage = '';

        if (error.data.error) {
            errorMessage = error.data.error;
        } else if (error.data) {
            errorMessage = error.data;
        } else {
            errorMessage = error;
        }
        dispatch(authActionCreators.authenticationError(errorMessage));
    }
}

export function loginUser({ email, password }) {
    return (dispatch) => {
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then((response) => {
                cookie.save('token', response.data.token, { path: '/' });
                dispatch(authActionCreators.authenticateUser());
            })
            .catch(error => errorHandler(dispatch, error.response));
    };
}

export function registerUser({ email, firstName, lastName, password }) {
    return (dispatch) => {
        axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
            .then((response) => {
                cookie.save('token', response.data.token, { path: '/' });
                dispatch(authActionCreators.authenticateUser());
            })
            .catch(error => errorHandler(dispatch, error.response));
    };
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(authActionCreators.unauthenticateUser());
        cookie.remove('token', { path: '/' });
    };
}

export function protectedTest() {
    return (dispatch) => {
        axios.get(`${API_URL}/protected`, { headers: { Authorization: cookie.load('token') }, })
            .then(response => dispatch(authActionCreators.protectedTest(response.data.content)))
            .catch(error => errorHandler(dispatch, error.response));
    };
}
