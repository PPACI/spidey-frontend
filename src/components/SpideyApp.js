import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import { ToastContainer, ToastMessage } from 'react-toastr';

import Colors from '../utils/colors';
import SearchContainer from './SearchContainer';

import '../styles/SpideyApp.css';
import '../styles/vendors/animate.min.css';
import '../styles/vendors/toastr.min.css';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: Colors.PRIMARY,
        accent1Color: Colors.SECONDARY
    }
});

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

const toatrGlobalSettings = {
    progressBar: true,
    timeOut: 10*1000
};

export default class SpideyApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = { drawerOpened: false };
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

    setToastr = (toastr) => {
        this.toastr = toastr;
    };

    getToastrProxy = () => {
        return {
            error: (...args) => {
                this.toastr.error(...args, toatrGlobalSettings);
            },
            info: (...args) => {
                this.toastr.info(...args, toatrGlobalSettings);
            },
            success: (...args) => {
                this.toastr.success(...args, toatrGlobalSettings);
            },
            warning: (...args) => {
                this.toastr.warning(...args, toatrGlobalSettings);
            }
        };
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <ToastContainer className="toast-top-right" ref={ this.setToastr } toastMessageFactory={ToastMessageFactory} />
                    <Drawer open={this.state.drawerOpened} docked={false} width={260} onRequestChange={this.handleRequestChange}>
                        <MenuItem onTouchTap={this.hideMenu} primaryText="Put your API key" rightIcon={
                            <FontIcon className="material-icons">settings</FontIcon>
                        } />
                        <MenuItem onTouchTap={this.hideMenu}>Be awesome</MenuItem>
                        <Divider />
                        <MenuItem onTouchTap={this.hideMenu}>Do some other stuff</MenuItem>
                    </Drawer>
                    <AppBar className="nav-bar" title="Spidey" showMenuIconButton={true} onLeftIconButtonTouchTap={this.showMenu} />
                    <SearchContainer twitterService={ this.props.serviceContainer.get('twitter') } toastr={ this.getToastrProxy() }  />
                </div>
            </MuiThemeProvider>
        );
    }

}