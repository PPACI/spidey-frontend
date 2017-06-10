import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';

import Colors from '../utils/colors';
import SearchContainer from './SearchContainer';

import '../styles/SpideyApp.css';

export default class SpideyApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = { drawerOpened: false };
    }

    render() {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: Colors.PRIMARY,
                accent1Color: Colors.SECONDARY
            }
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Drawer open={this.state.drawerOpened} docked={false} width={260} onRequestChange={this.handleRequestChange}>
                        <MenuItem onTouchTap={this.hideMenu} primaryText="Put your API key" rightIcon={
                            <FontIcon className="material-icons">settings</FontIcon>
                        } />
                        <MenuItem onTouchTap={this.hideMenu}>Be awesome</MenuItem>
                        <Divider />
                        <MenuItem onTouchTap={this.hideMenu}>Do some other stuff</MenuItem>
                    </Drawer>
                    <AppBar className="nav-bar" title="Spidey" showMenuIconButton={true} onLeftIconButtonTouchTap={this.showMenu} />
                    <SearchContainer twitterService={ this.props.serviceContainer.get('twitter') } />
                </div>
            </MuiThemeProvider>
        );
    }

    showMenu = () => {
        this.setState({ drawerOpened: true });
    };

    hideMenu = () => {
      this.setState({ drawerOpened: false });
    };

    handleRequestChange = (drawerOpened) => {
        this.setState({drawerOpened});
    };
}