import React, { Component } from "react";
import Main from "./components/main.js";
import Typography from "typography";
import githubTheme from "typography-theme-github";

githubTheme.headerFontFamily = ["Roboto", "sans-serif"];
githubTheme.bodyFontFamily = ["Roboto", "sans-serif"];
githubTheme.headerWeight = 300;
githubTheme.bodyWeight = 300;

githubTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    "h1,h2,h3,h4": {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontWeight: 300,
    },
    body: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontWeight: 300,
    },
});

const typography = new Typography(githubTheme);
typography.injectStyles();

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props.match.params);
    }

    render() {
        return (
            <div className="App">
                <Main params={this.props.match.params} />
            </div>
        );
    }
}

export default App;
