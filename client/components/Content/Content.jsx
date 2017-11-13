import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

import MarkdownPage from '../Pages/MarkdownPage.jsx';
import resume from '../../../assets/content/philip-lipman-resume-07oct2017.md';
import mdtest from '../../../assets/content/mdtest.md';

import {
    getCards,
    setSelectedCard,
} from './thunks/contentThunks.jsx';

const mapStateToProps = state => ({
    user: state.auth.user,
    cards: state.content.cards,
    selectedCardId: state.content.selectedCardId,
});

const mapDispatchToProps = dispatch => ({
    getAllCards: bindActionCreators(getCards, dispatch),
    selectCard: bindActionCreators(setSelectedCard, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class Content extends React.Component {
    static propTypes = {
        getAllCards: PropTypes.func.isRequired,
        user: PropTypes.shape(
            {
                _id: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                email: PropTypes.string,
                role: PropTypes.arrayOf(PropTypes.string),
            },
        ),
        cards: PropTypes.arrayOf(
            PropTypes.shape(
                {
                    _id: PropTypes.string,
                    label: PropTypes.string,
                    createAd: PropTypes.instanceOf(Date),
                },
            ),
        ).isRequired,
        selectCard: PropTypes.func.isRequired,
        selectedCardId: PropTypes.string,
    };

    static defaultProps = {
        user: null,
        selectedCardId: '',
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

    handleAddCard = () => (
        <Link to='/addCard'>
            Add New Card
        </Link>
    );

    handleSelectCard = (cardId) => {
        const {
            selectCard,
        } = this.props;
        selectCard({ cardId });
    };

    renderCardContent() {
        const {
            selectedCardId,
            cards,
        } = this.props;

        const selectedCard = cards.filter((card) => {
            return card._id === selectedCardId; // eslint-disable-line no-underscore-dangle
        }).shift();

        const result = (
            <MarkdownPage
                content={selectedCard.content}
            />
        );

        return result;

    }

    renderCards() {
        const {
            cards,
        } = this.props;

        return cards.map((card) => {
            const cardId = card._id; // eslint-disable-line no-underscore-dangle

            return (
                <Card
                    key={cardId}
                    header={card.label}
                    onClick={() => this.handleSelectCard(cardId)}
                />
            );
        });
    }

    render() {
        const {
            selectedCardId,
        } = this.props;
        return (
            <div>
                Selected card id: { selectedCardId }
                {this.isRole('Admin') && this.handleAddCard()}
                <Card.Group
                    itemsPerRow={3}
                    stackable
                >
                    {this.renderCards()}
                </Card.Group>

                { selectedCardId && this.renderCardContent() }
            </div>
        );
    }
}
