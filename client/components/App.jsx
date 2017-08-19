import React from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/combinedReducers.jsx';

import About from './About/About.jsx';
import Library from './Comic/Library.jsx';
import Home from './Pages/Home.jsx';
import Layout from './Layout/Layout.jsx';

import Register from './Auth/Register.jsx';

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
                    </Layout>
                </Router>
            </Provider>
        );
    }
}
