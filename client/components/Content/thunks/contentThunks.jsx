import axios from 'axios';
import Cookies from 'universal-cookie';

import * as contentActionCreators from '../actions/contentActions.jsx';
import {
    API_URL,
} from '../../../utils/config/config.jsx';


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
    } else {
        dispatch({
            type,
            payload: errorMessage,
        });
    }
}

export function getCards() {
    return dispatch => axios
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
}

export function addNewCard({ label, parentId, content }) {
    return (dispatch) => {
        const cookie = new Cookies();
        return axios
            .post(`${API_URL}/content/add-card`,
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

export function setSelectedCard({ cardId }) {
    return (dispatch) => {
        dispatch(contentActionCreators.setSelectedCard(cardId));
    };
}
