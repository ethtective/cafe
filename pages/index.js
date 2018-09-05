import metadata from "../js/metadata.js";
import Head from "next/head";
import { TypographyStyle, GoogleFont } from "react-typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "typography";
import githubTheme from "typography-theme-github";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MagicDropzone from "react-magic-dropzone";
import JSONPretty from "react-json-pretty";

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
            address: "",
            metadata: { address: "", name: "", image: "" },
            price: "NaN",
            network: 3,
        };
    }

    componentDidMount() {
        metaData = new metadata();
        this.setState({ address: metaData.contract_address });
        metaData.getPrice().then(result => {
            // console.log(result);
            this.setState({ price: result });
        });
        metaData.getNetwork().then(result => {
            this.setState({ network: parseInt(result) });
        });
        this.viewAddress(metaData.contract_address);
    }

    onInputChange = async e => {
        // console.log(e.target.value);
        this.setState({
            address: e.target.value,
        });
    };

    viewAddress = address => {
        metaData
            .getAddressData(address)
            .then(contractdata => {
                console.log(contractdata);
                if (contractdata.data.metadata.logo) {
                    let image = contractdata.data.metadata.logo;
                    this.setState({ logo: image });
                }
                this.setState({
                    saveName: contractdata.data.metadata.name,
                    saveUrl: contractdata.data.metadata.url,
                    saveDescription: contractdata.data.metadata.description,
                    saveAddress: contractdata.address,
                });
                this.setState({ metadata: contractdata });
            })
            .catch(err => {
                throw Error(err);
            });
    };

    onViewAddress = e => {
        this.viewAddress(this.state.address);
    };

    onSubmit = async e => {
        const data = metaData.getEmptyObject();
        data.address = this.state.saveAddress;
        data.metadata.name = this.state.saveName;
        data.metadata.url = this.state.saveUrl;
        data.metadata.description = this.state.saveDescription;
        if (this.state.file)
            data.metadata.logo = await metaData.convertBlobToBase64(
                this.state.file,
            );
        metaData.storeMetadata(data.address, data).then(response => {
            this.setState({ address: this.state.saveAddress });
        });
    };

    formatData = data => {};

    onDrop = (accepted, rejected, links) => {
        console.log(accepted);
        this.setState({
            file: accepted,
        });
    };

    handleSaveChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        return (
            <div
                className="markdown"
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
                    {this.state.network === 3 ? (
                        <p>
                            <b>
                                Upload the following metadata for{" "}
                                {this.state.price} Eth:
                            </b>
                        </p>
                    ) : (
                        ""
                    )}
                </p>
                <form noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        required={true}
                        label="Address"
                        onChange={this.handleSaveChange("saveAddress")}
                        className="top-padding monofont"
                    />
                    <TextField
                        fullWidth
                        required={true}
                        label="Name"
                        onChange={this.handleSaveChange("saveName")}
                        className="top-padding"
                    />
                    <TextField
                        fullWidth
                        label="Url"
                        onChange={this.handleSaveChange("saveUrl")}
                        className="top-padding"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        onChange={this.handleSaveChange("saveDescription")}
                        className="top-padding"
                    />
                    <div className="button-aligner">
                        <label htmlFor="flat-button-file">
                            <Button
                                size="small"
                                component="span"
                                className={"image_upload button"}
                            >
                                <MagicDropzone
                                    className="Dropzone"
                                    accept="image/jpeg, image/png, .jpg, .jpeg, .png, .svg"
                                    onDrop={this.onDrop}
                                >
                                    {this.state.file ? "" : ""}
                                    {this.state.file
                                        ? this.state.file[0].name + " uploaded!"
                                        : "Upload Image"}
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
                    </div>
                </form>
                <br />
                <br />
                <h1>Metadata Viewer</h1>
                <TextField
                    label="Address"
                    fullWidth
                    value={this.state.address}
                    onChange={this.onInputChange}
                    className="top-padding monofont"
                />
                <div className="button-aligner">
                    <Button
                        size="small"
                        variant="contained"
                        onClick={this.onViewAddress}
                    >
                        View
                    </Button>
                </div>
                <br />
                <br />
                <img
                    src={this.state.logo}
                    style={{
                        width: 64,
                        height: 64,
                        border: "1px solid #dfdfdf",
                    }}
                />
                <JSONPretty json={JSON.stringify(this.state.metadata.data)} />
                <style global jsx>{`
                    .json-pretty {
                        line-height: 1.75;
                        color: #66d9ef;
                    }
                    .json-pretty .json-key {
                        color: #aaa;
                        font-weight: lighter;
                    }
                    .json-pretty .json-value {
                        color: #3b4252;
                    }
                    .json-pretty .json-string {
                        color: #434c5e;
                    }
                    .json-pretty .json-boolean {
                        color: #ac81fe;
                    }
                    .button {
                        margin-right: 15px;
                    }
                    .button-aligner {
                        margin-top: 15px;
                        float: right;
                    }
                    .top-padding {
                        margin-top: 3px;
                    }
                    .monofont input {
                        font-family: monospace;
                        font-size: 120%;
                    }
                `}</style>
            </div>
        );
    }
}
