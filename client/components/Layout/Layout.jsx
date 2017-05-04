import React from 'react';
import PropTypes from 'prop-types';

import { Container, Grid } from 'semantic-ui-react';

import Menu from './Navigation/Menu.jsx';

export default class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
    };

    static defaultProps = {
        children: [],
    };

    render() {
        return (
            <Grid
                stackable
            >
                <Grid.Row
                    stretched
                >
                    <Grid.Column
                        largeScreen={16}
                    >
                        <Container
                            text
                        >
                            <Menu />
                            { this.props.children }
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
