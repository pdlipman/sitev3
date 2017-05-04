import React from 'react';
import PropTypes from 'prop-types';

import { Header, Icon } from 'semantic-ui-react';

export default class IconHeader extends React.Component {
    static propTypes = {
        contents: PropTypes.string.isRequired,
        headerTag: PropTypes.string,
        iconName: PropTypes.string.isRequired,
        subHeader: PropTypes.string,
    };

    static defaultProps = {
        headerTag: 'h2',
        subHeader: '',
    };

    render() {
        const {
            contents,
            headerTag,
            iconName,
            subHeader,
        } = this.props;

        return (
            <Header
                as={headerTag}
            >
                <Icon
                    name={iconName}
                />
                <Header.Content>
                    { contents }
                    <Header.Subheader>
                        { subHeader }
                    </Header.Subheader>
                </Header.Content>
            </Header>
        );
    }
}
