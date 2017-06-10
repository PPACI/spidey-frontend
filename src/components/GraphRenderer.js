import React from 'react';
import {Sigma, ForceAtlas2} from 'react-sigma';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Paper from 'material-ui/Paper';

import UserWidget from './UserWidget';

import "../styles/GraphRenderer.css";
import Colors from "../utils/colors";

const sigmaStyle = {
    width: "auto",
    height: "100%"
};

const sigmaSettings = {
    labelThreshold: 10,
    minNodeSize: 1,
    maxNodeSize: 7,
    enableHovering: false
};

const refreshIndicatorStyle = {
    display: 'inline-block',
    position: 'relative'
};

export default class GraphRenderer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userNode: null
        };
    }

    render() {
        return (
           <Paper zDepth={1} rounded={true} className="graph-wrapper">

               <UserWidget {...this.state.userNode} closeHandler={this.closeUserWidget} />

               <div className={ 'main-graph ' +  (this.props.isLoading || this.props.graph === null ? 'centered' : '')}>{
                   this.props.isLoading ?
                       <RefreshIndicator
                           size={50}
                           left={0}
                           top={40}
                           loadingColor={Colors.SECONDARY}
                           status="loading"
                           style={refreshIndicatorStyle}
                       /> :
                       this.props.graph === null ?
                           <b>No graph to render. Put a URL of a tweet to get a beautiful graph</b> :
                           <Sigma renderer="webgl" graph={this.props.graph} onClickNode={this.handleClickNode}
                                  style={sigmaStyle} settings={sigmaSettings}>
                               <ForceAtlas2 />
                           </Sigma>
               }</div>
           </Paper>
        );
    }

    handleClickNode = (e) => {
        const { node } = e.data;

        console.log(node);

        const userNode = {
            x: node.x,
            y: node.y,
            username: node.label,
            description: node.description,
            isShown: true
        };

        this.setState({ userNode });
    };


    closeUserWidget = (e) => {
        const { userNode } = this.state;

        const newUserNode = Object.assign({}, userNode, {
            isShown: false
        });

        this.setState({ userNode: newUserNode });
    };
}