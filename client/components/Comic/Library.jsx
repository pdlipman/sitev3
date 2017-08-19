import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconHeader from '../Layout/Header/IconHeader.jsx';
import Title from './Title.jsx';

import { getComics } from './thunks/comicThunks.jsx';

const mapDispatchToProps = dispatch => ({
    getComics: bindActionCreators(getComics, dispatch),
});

@connect(null, mapDispatchToProps)
export default class Library extends React.Component {

    static propTypes = {
        getComics: PropTypes.func,
        comics: PropTypes.object,
    };

    componentDidMount() {
        this.props.getComics();
    }

    render() {
        return (
            <div>
                <IconHeader
                    contents='Library'
                    headerTag='h2'
                    iconName='book'
                    subHeader={'Books!'}
                />
                <Title />
            </div>
        );
    }
}
