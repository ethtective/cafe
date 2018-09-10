import React, { Component } from "react";
import Main from "./components/main.js";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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

const theme = createMuiTheme({
    palette: {
        primary: { light: "#00ffd9", main: "#00ffd9", dark: "#00ffd9" }, // Purple and green play nicely together.
    },
});

const typography = new Typography(githubTheme);
typography.injectStyles();

class App extends Component {
    componentWillMount() {
        console.log(this.props.match.params);
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <Main params={this.props.match.params} />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
