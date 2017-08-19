import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Book from './Book.jsx';
import { openComic } from './thunks/comicThunks.jsx';

const mapDispatchToProps = dispatch => ({
    openComic: bindActionCreators(openComic, dispatch),
});

@connect(null, mapDispatchToProps)
export default class Title extends React.Component {

    static propTypes = {
        openComic: PropTypes.func,
    };

    handleClick = () => {
        console.log('hello world');
        this.props.openComic({ id: 'hello world' });
    };

    render() {
        return (
            <div onClick={ this.handleClick }>
                Title Page
                <Book />
            </div>
        );
    }
}

