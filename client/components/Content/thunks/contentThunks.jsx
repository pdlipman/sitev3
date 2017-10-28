import axios from 'axios';
import Cookies from 'universal-cookie';

import * as contentActionCreators from '../actions/contentActions.jsx';

const API_URL = 'http://tranquil-plains-96188.herokuapp.com/api';
// const API_URL = 'http://localhost:8090/api';

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
    } else {
        dispatch({
            type,
            payload: errorMessage,
        });
    }
}

export function getCards() {
    return (dispatch) => {
        axios
            .get(`${API_URL}/content/get-cards`)
            .then((response) => {
                const {
                    cards,
                } = response.data;
                dispatch(contentActionCreators.getCards(cards));
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, contentActionCreators.CONTENT_ERROR);
            });
    };
}

export function addNewCard({ label, parentId, content }) {
    return (dispatch) => {
        const cookie = new Cookies();
        axios
            .post(
                `${API_URL}/content/add-card`,
                {
                    content,
                    label,
                    parentId,
                },
                {
                    headers: {
                        Authorization: cookie.get('token'),
                    },
                },
            )
            .then(() => {
                getCards();
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, contentActionCreators.CONTENT_ERROR);
            });
    };
}
