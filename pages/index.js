import metadata from "../js/metadata.js";
import Head from "next/head";
import { TypographyStyle, GoogleFont } from "react-typography";
import Typography from "typography";
import githubTheme from "typography-theme-github";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import JSONPretty from "react-json-pretty";
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
            network: 3,
        };
    }

    componentDidMount() {
        metaData = new metadata();
        metaData.getPrice().then(result => {
            // console.log(result);
            this.setState({ price: result });
        });
        metaData.getNetwork().then(result => {
            console.log(result);
            this.setState({ network: parseInt(result) });
        });
        this.viewAddress(this.state.address);
    }

    onInputChange = async e => {
        // console.log(e.target.value);
        this.setState({
            address: e.target.value,
        });
    };

    viewAddress = address => {
        metaData.getAddress(address).then(response => {
            // console.log(response);
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

    onViewAddress = e => {
        this.viewAddress(this.state.address);
    };

    onViewAddressPromise = e => {
        metaData.retrieveDataJSON(this.state.address).then(result => {
            console.log(result);
        });
    };

    onSubmit = e => {
        metaData.addMetaData(
            this.state.saveAddress,
            this.state.saveName,
            this.state.file,
        );
        this.setState({ address: this.state.saveAddress });
    };

    onDrop = (accepted, rejected, links) => {
        // console.log(accepted);
        this.setState({
            file: accepted,
        });
    };

    handleSaveChange = prop => event => {
        this.setState({ [prop]: event.target.value });
        // console.log(this.state);
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
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                <Head>
                    <TypographyStyle typography={typography} />
                    <GoogleFont typography={typography} />
                </Head>
                <h1>Metadata Uploader </h1>
                <p>
                    {this.state.network !== 3 ? (
                        <b style={{ color: "red" }}>
                            Please connect to Ropsten test network to upload
                            metadata
                        </b>
                    ) : (
                        ""
                    )}
                </p>
                Ropsten Testnet Contract:{" "}
                <code>{metaData.contract_address}</code>
                <p>
                    {this.state.network === 3
                        ? "Upload the following metadata for " +
                          this.state.price +
                          " Eth:"
                        : ""}
                </p>
                <form noValidate autoComplete="off">
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
                        <Button
                            size="small"
                            component="span"
                            className={"image_upload"}
                        >
                            <MagicDropzone
                                className="Dropzone"
                                accept="image/jpeg, image/png, .jpg, .jpeg, .png, .svg"
                                onDrop={this.onDrop}
                            >
                                Upload Image
                            </MagicDropzone>
                        </Button>
                    </label>{" "}
                    <Button
                        size="small"
                        variant="contained"
                        onClick={this.onSubmit}
                    >
                        Save To Ethereum
                    </Button>
                </form>
                <h1>Metadata Viewer</h1>
                <img
                    src={this.state.metadata.image}
                    style={{ width: 64, height: 64 }}
                />
                <JSONPretty
                    language="JSON"
                    json={JSON.stringify(this.state.metadata)}
                />
                <TextField
                    label="Address"
                    fullWidth
                    value={this.state.address}
                    onChange={this.onInputChange}
                />
                <br />
                <br />
                <Button
                    size="small"
                    variant="contained"
                    onClick={this.onViewAddress}
                >
                    View
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={this.onViewAddressPromise}
                >
                    View Promise
                </Button>
            </div>
        );
    }
}
