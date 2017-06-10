import React from 'react';

import FontIcon from 'material-ui/FontIcon';

import "../styles/UserWidget.css";

const userWidgetWidth = 250;

export default class UserWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={ 'user-widget' + (this.props.isShown ? ' is-shown': '')}
                    style={{top: this.props.y, left: this.props.x, width: userWidgetWidth}}>

            <div className="user-close" onClick={this.close}>
                <FontIcon className="material-icons" color="#fff">close</FontIcon>
            </div>

            <header>
                <div className="user-username">{this.props.username}</div>
                <img className="user-picture" src="https://randomuser.me/api/portraits/women/64.jpg" alt="Avatar"/>
            </header>

            <div className="user-description">
                {this.props.description}
            </div>
        </div>
    }

    close = () => {
      this.props.closeHandler();
    };

}