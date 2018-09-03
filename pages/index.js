import metadata from "../js/metadata.js";
import Head from "next/head";
import { TypographyStyle, GoogleFont } from "react-typography";
import Typography from "typography";
import githubTheme from "typography-theme-github";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/styles/hljs";
import MagicDropzone from "react-magic-dropzone";

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
let metaData = {};

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "0x09ca59e18c58f25b092a0f2670928f5d0656a331",
            metadata: { address: "", name: "", image: "" },
            price: "NaN",
        };
    }

    componentDidMount() {
        metaData = new metadata();
        metaData.getPrice().then(result => {
            console.log(result);
            this.setState({ price: result });
        });
    }

    onInputChange = async e => {
        console.log(e.target.value);
        this.setState({
            address: e.target.value,
        });
    };

    onViewAddress = e => {
        console.log("pressed");
        metaData.getAddress(this.state.address).then(response => {
            console.log(response);
            if (response.image) {
                let ipfs = metaData.lookUp(response.image, result => {
                    let image = result;
                    response.image = image;
                    this.setState({ metadata: response });
                });
            } else {
                this.setState({ metadata: response });
            }
        });
    };

    onSubmit = e => {
        console.log("pressed");
        metaData.addMetaData(
            this.state.saveAddress,
            this.state.saveName,
            this.state.file,
        );
    };

    onDrop = (accepted, rejected, links) => {
        console.log(accepted);
        this.setState({
            file: accepted,
        });
    };

    handleSaveChange = prop => event => {
        this.setState({ [prop]: event.target.value });
        console.log(this.state);
    };

    render() {
        return (
            <div
                class="markdown"
                style={{
                    maxWidth: "42rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    padding: "1.5rem 1.125rem",
                    paddingTop: "1.5rem",
                }}
            >
                <Head>
                    <TypographyStyle typography={typography} />
                    <GoogleFont typography={typography} />
                </Head>
                <h1>Metadata Viewer</h1>
                <p>Contract at: </p>

                <pre>
                    <code>{metaData.contract_address}</code>
                </pre>
                <img
                    src={this.state.metadata.image}
                    style={{ width: 64, height: 64 }}
                />
                <SyntaxHighlighter language="JSON" style={docco}>
                    {JSON.stringify(this.state.metadata)}
                </SyntaxHighlighter>
                <TextField
                    label="Address"
                    fullWidth
                    value={this.state.address}
                    onChange={this.onInputChange}
                />
                <br />
                <br />
                <Button variant="contained" onClick={this.onViewAddress}>
                    View
                </Button>

                <h1>Metadata Uploader</h1>
                <p>Upload the following metadata for {this.state.price} Eth:</p>
                <form class="" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Address"
                        onChange={this.handleSaveChange("saveAddress")}
                    />
                    <TextField
                        fullWidth
                        label="Name"
                        onChange={this.handleSaveChange("saveName")}
                    />
                    <br />
                    <br />
                    <label htmlFor="flat-button-file">
                        <Button component="span" className={"image_upload"}>
                            <MagicDropzone
                                className="Dropzone"
                                accept="image/jpeg, image/png, .jpg, .jpeg, .png, .svg"
                                onDrop={this.onDrop}
                            >
                                Upload Image
                            </MagicDropzone>
                        </Button>
                    </label>{" "}
                    <Button variant="contained" onClick={this.onSubmit}>
                        Save To Ethereum
                    </Button>
                </form>
            </div>
        );
    }
}
