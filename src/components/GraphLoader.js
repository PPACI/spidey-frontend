import React from 'react';

import "../styles/GraphLoader.css";

export default class GraphLoader extends React.Component {

    render() {
        return (
            <div className="graph-loader">
                <div className="dot dotOne"></div>
                <div className="dot dotTwo"></div>
                <div className="dot dotThree"></div>
                <div className="dot dotFour"></div>
            </div>
        );
    }

}