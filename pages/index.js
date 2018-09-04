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
                <br />
                <br />
                <img src={this.state.logo} style={{ width: 64, height: 64 }} />
                <JSONPretty
                    language="JSON"
                    json={JSON.stringify(this.state.metadata.data)}
                />
            </div>
        );
    }
}
