import React from 'react';

import SearchBar from './SearchBar';
import GraphRenderer from './GraphRenderer';

export default class SearchContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { graph: null, isLoading: false };
    }

    render() {
        return (
            <div>
                <SearchBar handler={this.search} />
                <GraphRenderer graph={this.state.graph} isLoading={this.state.isLoading} />
            </div>
        );
    }

    search = (text) => {
        this.setState({isLoading: true});

        this.props.twitterService.getGraph(text)
            .then((graph) => {
                console.log(graph);
                this.setState({ graph: graph, isLoading: false });
            })
            .catch((err) => console.error("TwitterService - getGraph", err));
    };

}