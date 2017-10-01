import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from '../Auth/reducers/authReducers.jsx';
import contentReducer from '../Content/reducers/contentReducers.jsx';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    content: contentReducer,
});

export default rootReducer;
