import React from 'react';

import FontIcon from 'material-ui/FontIcon';

import "../styles/UserWidget.css";

const userWidgetWidth = 250;

export default class UserWidget extends React.Component {

    render() {
        return <div className={ 'user-widget' + (this.props.isShown ? ' is-shown': '')}
                    style={this.getPosition()}>

            <div className="user-close" onClick={this.close}>
                <FontIcon className="material-icons" color="#fff">close</FontIcon>
            </div>

            <header style={this.getBanner()}>
                <img className="user-picture" src={this.props.profilePictureUrl} alt="Avatar" />
            </header>

            <div className="user-username">{this.props.userName}</div>

            <div className="user-description">
                {this.props.description}
            </div>
        </div>
    }

    getPosition = () => {
        const [ top, left ] = [
            this.props.y / this.props.ratioY,
            this.props.x / this.props.ratioX
        ].map(coordinate => isNaN(coordinate) ? 0 : coordinate * this.props.zoom);

        console.log({ top, left });

        return {
            top: `calc(50% + ${top}px)`,
            left: `calc(50% + ${left}px)`,
            width: userWidgetWidth
        };
    };

    getBanner = () => {
        return { backgroundImage: `url(${this.props.bannerPictureUrl})` };
    };

    close = () => {
      this.props.closeHandler();
    };

}