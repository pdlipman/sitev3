import React from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/combinedReducers.jsx';
import Cookies from 'universal-cookie';

import About from './About/About.jsx';
import Library from './Comic/Library.jsx';
import Home from './Pages/Home.jsx';
import Layout from './Layout/Layout.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';

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
    console.log(user);
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
                            path='/about'
                            component={About}
                        />
                        <Route
                            path='/library'
                            component={Library}
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
                    </Layout>
                </Router>
            </Provider>
        );
    }
}
