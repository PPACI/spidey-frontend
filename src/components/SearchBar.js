import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/SearchBar.css';

const underlineStyle = { color: "#fff"};

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: null, active: false };
    }

    render() {
        return (
            <div className="form-wrapper">
                <form className="search-bar-wrapper" onSubmit={this.handleSubmit}>
                    <TextField className="search-bar" floatingLabelText="URL of a Tweet"
                                underlineStyle={underlineStyle} underlineShow={!this.state.active}
                                onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                    <RaisedButton secondary={true} type="submit" label="OK" />
                </form>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    };

    handleFocus = () => {
        setTimeout(() => this.setState({ active: true }), 200);
    };

    handleBlur = (e) => {
        this.setState({ active: e.target.value.trim().length > 0 });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        console.log("Twitter username", this.state.text);
        this.props.handler(this.state.text);
    };

}