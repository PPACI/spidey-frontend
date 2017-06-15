import React from 'react';
import {Sigma, ForceAtlas2} from 'react-sigma';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import UserWidget from './UserWidget';

import "../styles/GraphRenderer.css";
import Colors from "../utils/colors";
import {THRESHOLD} from "../utils/constants";

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

const sigmaRefreshSettings = { skipIndexation: true };

export default class GraphRenderer extends React.Component {

    sigma = {};

    constructor(props) {
        super(props);

        this.state = {
            userNode: {
                x: 0,
                y: 0,
                ratioX: 1,
                ratioY: 1
            }
        };
    }

    displayUserInGraphInput = () => {
        if(this.props.graph) {
            return (
                <div className="find-user-in-graph">
                    <TextField hintText="Search someone in the graph" fullWidth={true} onChange={this.findUserInGraph} />
                </div>
            );
        }
    };

    render() {
        return (
           <Paper zDepth={1} rounded={true} className="graph-wrapper">
               { this.displayUserInGraphInput() }

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
                           <b>To get a graph, please enter a Twitter username</b> :
                           <Sigma renderer="webgl" graph={this.props.graph} settings={sigmaSettings}
                                  ref={ this.initSigmaContext } onClickNode={this.handleClickNode} style={sigmaStyle}>
                               <ForceAtlas2 />
                           </Sigma>
               }</div>
           </Paper>
        );
    }

    findUserInGraph = (e) => {
        const text = (e.target.value || '').toLowerCase().trim();
        if(text.length < 3) return;

        const nodes = this.sigma.graph.nodes();
        const node = nodes.find((node) => node.label.toLowerCase().indexOf(text) > -1);
        if(!node) return;

        setTimeout(() => this.selectNode(node), THRESHOLD);

        window.sigma.misc.animation.camera(
            this.sigma.camera,
            {
                x: node[this.sigma.camera.readPrefix + 'x'],
                y: node[this.sigma.camera.readPrefix + 'y'],
                ratio: 0.075
            },
            {
                duration: this.sigma.settings('animationsTime') || 300
            }
        );
    };

    initSigmaContext = (sigmaWrapper) => {
        if(!sigmaWrapper) return;

        const { sigma } = sigmaWrapper ;

        this.sigma = sigma;

        const nodes = this.sigma.graph.nodes();

        nodes.forEach(node => {
            if(!node.previousColor) {
                node.previousColor = node.color;
            }
        });

        this.sigma.bind('overNode', (e) => {
            document.body.style.cursor = 'pointer';
            this.selectNode(e.data.node);
        });

        this.sigma.bind('outNode', (e) => {
            document.body.style.cursor = 'inherit';
            this.unSelectNode(e.data.node);
        });

        this.sigma.bind('clickStage', () => {
            setTimeout(() => this.closeUserWidget(), 0);
        });
    };

    selectNode = (node) => {
        const nodes = this.sigma.graph.nodes();

        nodes.forEach(n => {
            n.color = n.previousColor;
        });

        node.color = Colors.PRIMARY;
        this.sigma.refresh(sigmaRefreshSettings);
    };

    unSelectNode = (node) => {
        node.color = node.previousColor;
        this.sigma.refresh(sigmaRefreshSettings);
    };

    handleRatios = () => {
        const { ratioX, ratioY } = this.state.userNode;

        if(ratioX === 1 && ratioY === 1) {
            this.computeRatios();
        }
    };

    computeRatios = () => {
        const nodes = this.sigma.graph.nodes();

        const nodesX = nodes.map(n => n.x);
        const nodesY = nodes.map(n => n.y);

        const [ minX, maxX, minY, maxY ] = [
            Math.min(...nodesX),
            Math.max(...nodesX),
            Math.min(...nodesY),
            Math.max(...nodesY)
        ].map(Math.abs);

        const [ ratioX, ratioY ] = [
            minX + maxX,
            minY + maxY
        ].map(r => r / 200);

        const ratios = { ratioX, ratioY };

        const { userNode } = this.state;
        const newUserNode = Object.assign({}, userNode, ratios);
        this.setState({ userNode: newUserNode });
    };

    handleClickNode = (e) => {
        const { node } = e.data;

        console.log("node", node);

        // Handle computing of ratios only the first time
        this.handleRatios();

        this.props.twitterService.getUser(node.label)
            .then(user => {
                console.info("user", user);

                const userNode = {
                    x: node.x,
                    y: node.y,
                    userName: user.userName,
                    description: user.description,
                    profilePictureUrl: (user.profilePictureUrl || '').replace('_normal', ''),
                    bannerPictureUrl: user.bannerPictureUrl,
                    accountUrl: user.accountUrl,
                    isShown: true
                };

                this.setState({ userNode });
            })
            .catch(e => console.error("[twitterService.getUser]", e))
    };


    closeUserWidget = (e) => {
        const { userNode } = this.state;

        const newUserNode = Object.assign({}, userNode, {
            isShown: false
        });

        this.setState({ userNode: newUserNode });
    };

}