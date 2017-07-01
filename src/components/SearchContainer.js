import React from 'react';

import SearchBar from './SearchBar';
import GraphRenderer from './GraphRenderer';

export default class SearchContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { graph: null, isLoading: false };
    }

    getGraph = (text) => {
        this.setState({isLoading: true});

        this.props.twitterService.getGraph(text)
            .then((graph) => {
                this.setState({ graph: graph, isLoading: false });
            })
            .catch((err) => console.error("TwitterService - getGraph", err));
    };

    render() {
        return (
            <div>
                <SearchBar handler={this.getGraph} />
                <GraphRenderer graph={this.state.graph} isLoading={this.state.isLoading} twitterService={this.props.twitterService} />
            </div>
        );
    }

}