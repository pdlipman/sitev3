import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Card } from 'semantic-ui-react';

import {
    addCard,
    getCards,
} from './thunks/contentThunks.jsx';

const mapStateToProps = state => ({
    user: state.auth.user,
    cards: state.content.cards,
});

const mapDispatchToProps = dispatch => ({
    addNewCard: bindActionCreators(addCard, dispatch),
    getAllCards: bindActionCreators(getCards, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Content extends React.Component {
    static propTypes = {
        addNewCard: PropTypes.func.isRequired,
        getAllCards: PropTypes.func.isRequired,
        user: PropTypes.shape(
            {
                _id: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                email: PropTypes.string,
                role: PropTypes.arrayOf(PropTypes.string),
            },
        ).isRequired,
        cards: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    _id: PropTypes.string,
                    label: PropTypes.string,
                    createAd: PropTypes.instanceOf(Date),
                },
            ),
        ).isRequired,
    };

    componentWillMount() {
        this.props.getAllCards();
    }

    isRole(roleToCheck) {
        const {
            user,
        } = this.props;
        return user && user.role.includes(roleToCheck);
    }

    handleAddCard() {
        const {
            addNewCard,
        } = this.props;

        return addNewCard && <p>Add New Card</p>;
    }

    renderCards() {
        const {
            cards,
        } = this.props;

        return cards.map(card => (
            <Card
                key={card._id} // eslint-disable-line no-underscore-dangle
                header={card.label}
            />
        ));
    }

    render() {
        return (
            <div>
                Hey Now
                {this.isRole('Admin') && this.handleAddCard()}
                <Card.Group
                    itemsPerRow={3}
                    stackable
                >
                    {this.renderCards()}
                </Card.Group>
            </div>
        );
    }
}
