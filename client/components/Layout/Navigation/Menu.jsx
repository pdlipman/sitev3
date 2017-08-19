import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class SidebarLeft extends Component {
    renderMenuItem = (options, index) => {
        const {
            name,
            path,
            label,
        } = options;
        return (
            <Menu.Item
                as={NavLink}
                exact
                name={name}
                to={path}
                key={index}
                color='blue'
            >
                { label }
            </Menu.Item>
        );
    };

    render() {
        const menuItems = [
            {
                name: 'home',
                path: '/',
                label: 'Home',
            },
            {
                name: 'about',
                path: '/about',
                label: 'About',
            },
            {
                name: 'library',
                path: '/library',
                label: 'Comics',
            },
        ];


        return (
            <Menu
                secondary
                pointing
                stackable
            >
                { menuItems.map((menuItem, index) => this.renderMenuItem(menuItem, index)) }
            </Menu>
        );
    }
}
