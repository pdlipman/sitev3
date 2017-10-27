import React from 'react';
import Cookies from 'universal-cookie';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/combinedReducers.jsx';

import Home from './Pages/Home.jsx';
import Layout from './Layout/Layout.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';

import Content from './Content/Content.jsx';
import AddCard from './Content/AddCard.jsx';

import Register from './Auth/Register.jsx';
import Login from './Auth/Login.jsx';
import RequireAuth from './Auth/RequireAuth.jsx';

import { AUTH_USER } from './Auth/actions/authActions.jsx';
/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware,
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);
/* eslint-enable */

const cookie = new Cookies();
const token = cookie.get('token');
const user = cookie.get('user');
if (token) {
    store.dispatch({ type: AUTH_USER, user });
}


export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function, max-len
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Layout>
                        <Route
                            exact
                            path='/'
                            component={Home}
                        />
                        <Route
                            path='/register'
                            component={Register}
                        />
                        <Route
                            path='/login'
                            component={Login}
                        />
                        <Route
                            path='/dashboard'
                            component={RequireAuth(Dashboard)}
                        />
                        <Route
                            path='/addCard'
                            component={RequireAuth(AddCard)}
                        />
                        <Route
                            path='/content'
                            component={Content}
                        />
                    </Layout>
                </Router>
            </Provider>
        );
    }
}
