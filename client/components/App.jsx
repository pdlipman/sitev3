import React from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';


import About from './About/About.jsx';
import Book from './Comic/Book.jsx';
import Home from './Home/Home.jsx';
import Layout from './Layout/Layout.jsx';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function, max-len
    render() {
        return (
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
                        path='/book'
                        component={Book}
                    />
                </Layout>
            </Router>
        );
    }
}
