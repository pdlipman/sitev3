import * as comicActionCreators from '../actions/comicActions.jsx';

export const openComic = ({ id }) =>
    dispatch =>
        dispatch(comicActionCreators.openComic({ id }));

function fetchPosts() {
    const URL = 'http://tranquil-plains-96188.herokuapp.com/api/users';
    return fetch(URL, { method: 'GET' })
        .then(response => Promise.all([response, response.json()]));
}

export const getComics = () => {
    return (dispatch) => {
        dispatch(comicActionCreators.fetchComicsRequest());
        return fetchPosts().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(comicActionCreators.fetchComicsSuccess(json));
            } else {
                dispatch(comicActionCreators.fetchComicsError());
            }
        });
    };
};
