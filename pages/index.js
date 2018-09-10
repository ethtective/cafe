import metadata from "../js/metadata.js";
import LuckyList from "./luckylist";
import Head from "next/head";
import { TypographyStyle, GoogleFont } from "react-typography";
import Typography from "typography";
import githubTheme from "typography-theme-github";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
            price: 0,
            network: 3,
            tokens: "",
            saveName: "",
            saveUrl: "",
            saveDescription: "",
            saveAddress: "",
            saveScam: false,
            saveImageData: "",
        };
    }

    static getInitialProps({ query: { address, editMode } }) {
        return { address: address, editMode: editMode };
    }

    componentWillMount() {
        metaData = new metadata();
        metaData.getPrice().then(result => {
            // console.log(result);
            this.setState({ price: result });
        });

        if (this.props.address) {
            this.setState({ address: this.props.address });
            this.viewAddress(this.props.address);
            this.editAddress(this.props.address).catch(err => {
                this.setState({ saveAddress: this.props.address });
            });
        } else {
            this.setState({ address: metaData.contractAddress });
            this.viewAddress(metaData.contractAddress);
        }
    }

    componentDidMount() {
        metaData.getMetamask();
        metaData.getNetwork().then(result => {
            this.setState({ network: parseInt(result) });
        });
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
                // console.log(contractdata);
                this.setState({ address: address });
                if (contractdata.data.metadata.logo) {
                    let image = contractdata.data.metadata.logo;
                    this.setState({ logo: image });
                } else {
                    this.setState({ logo: "" });
                }
                this.setState({ metadata: contractdata });
            })
            .catch(err => {
                throw Error(err);
            });
    };

    editAddress = address => {
        return metaData.getAddressData(address).then(contractdata => {
            // console.log(contractdata);
            if (contractdata.data.metadata.logo) {
                let image = contractdata.data.metadata.logo;
                this.setState({ logo: image, saveFile: image });
            }
            this.setState({
                saveName: contractdata.data.metadata.name,
                saveUrl: contractdata.data.metadata.url,
                saveDescription: contractdata.data.metadata.description,
                saveAddress: contractdata.address,
                saveScam:
                    contractdata.data.metadata.reputation.category === "Scam",
            });
            this.forceUpdate();
            this.setState({ metadata: contractdata });
        });
    };

    ethtective = () => {
        window.open(
            "https://canary.ethtective.com/" + this.state.address,
            "_blank",
        );
    };

    onSubmit = async e => {
        let data = metaData.getEmptyObject();
        // console.log(data);
        data.address = this.state.saveAddress;
        data.metadata.name = this.state.saveName;
        data.metadata.url = this.state.saveUrl;
        data.metadata.description = this.state.saveDescription;
        // console.log(this.state.saveScam);
        if (this.state.saveScam === true) {
            // console.log("WHY");
            data.metadata.reputation.status = "Blocked";
            data.metadata.reputation.category = "Scam";
        }
        if (this.state.file)
            data.metadata.logo = await metaData.convertBlobToBase64(
                this.state.file,
            );
        else if (this.state.saveFile) {
            data.metadata.logo = this.state.saveFile;
        }
        console.log(data);
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
    };

    handleSaveCheck = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        let preview = this.state.file ? (
            <img
                src={this.state.file[0].preview}
                style={{
                    width: 64,
                    height: 64,
                    float: "left",
                    marginTop: 15,
                }}
            />
        ) : this.state.saveFile ? (
            <img
                src={this.state.saveFile}
                style={{
                    width: 64,
                    height: 64,
                    float: "left",
                    marginTop: 15,
                }}
            />
        ) : (
            ""
        );

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
                    saveAddress: "",
                }}
            >
                <Head>
                    <TypographyStyle typography={typography} />
                    <GoogleFont typography={typography} />
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                </Head>
                {!this.props.editMode ? <LuckyList /> : ""}
                <h1>Metadata Uploader</h1>
                <p style={{ fontSize: "90%" }}>
                    <span>
                        <b style={{ color: "#00ffd9" }}>⚠️ Warning:</b> this is
                        a prototype registry contract, data may be lost (but
                        still counts as a donation!)
                    </span>
                </p>
                <form noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        error={
                            !metaData.isValidAddress(this.state.saveAddress) &&
                            this.state.saveAddress.length > 0
                        }
                        required={true}
                        label="Address"
                        value={this.state.saveAddress}
                        onChange={this.handleSaveChange("saveAddress")}
                        className="top-padding monofont"
                    />
                    <TextField
                        fullWidth
                        required={true}
                        label="Name"
                        value={this.state.saveName}
                        onChange={this.handleSaveChange("saveName")}
                        className="top-padding"
                    />
                    <TextField
                        fullWidth
                        label="Url"
                        value={this.state.saveUrl}
                        onChange={this.handleSaveChange("saveUrl")}
                        className="top-padding"
                    />
                    <TextField
                        label="Description"
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={this.state.saveDescription}
                        onChange={this.handleSaveChange("saveDescription")}
                        className="top-padding"
                        margin="normal"
                    />
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.saveScam}
                                    onChange={this.handleSaveCheck("saveScam")}
                                />
                            }
                            label="Mark as scam"
                        />
                    </FormGroup>
                    {preview}
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
                                        ? "✅ '" +
                                          this.state.file[0].name +
                                          "'' uploaded!"
                                        : "Upload Image"}
                                </MagicDropzone>
                            </Button>
                        </label>{" "}
                        <Button
                            disabled={
                                !(
                                    metaData.isValidAddress(
                                        this.state.saveAddress,
                                    ) && this.state.saveName.length > 0
                                )
                            }
                            size="small"
                            variant="contained"
                            onClick={this.onSubmit}
                            className={" button"}
                        >
                            Save To Ethereum
                        </Button>
                        <Button variant="outlined" disabled>
                            {this.state.price} Ξ
                        </Button>
                    </div>
                </form>
                <br />
                <br />
                <br />
                <h1>Metadata Viewer</h1>
                <TextField
                    label="Address"
                    fullWidth
                    required
                    error={
                        this.state.address &&
                        !metaData.isValidAddress(this.state.address) &&
                        this.state.address.length > 0
                    }
                    value={this.state.address}
                    onChange={this.onInputChange}
                    className="top-padding monofont"
                />
                <div className="button-aligner">
                    <Button
                        disabled={!metaData.isValidAddress(this.state.address)}
                        size="small"
                        variant="contained"
                        onClick={this.editAddress}
                        className={"button"}
                    >
                        Edit
                    </Button>
                    <Button
                        disabled={!metaData.isValidAddress(this.state.address)}
                        size="small"
                        variant="contained"
                        onClick={this.viewAddress}
                        className={"button"}
                    >
                        View
                    </Button>{" "}
                    <Button
                        disabled={!metaData.isValidAddress(this.state.address)}
                        size="small"
                        variant="contained"
                        onClick={this.ethtective}
                    >
                        View on Ethtective
                    </Button>
                </div>
                <br />
                <br />
                <img
                    src={this.state.logo}
                    style={{
                        width: 64,
                        height: 64,
                    }}
                />
                <JSONPretty json={JSON.stringify(this.state.metadata.data)} />
                <br />
                <br />
                <br />
                <h1>Further Reading</h1>
                <p>
                    🕵️ Mainnet Metadata Prototype Contract:{" "}
                    <a
                        href={
                            "http://canary.ethtective.com/" +
                            metaData.contractAddress
                        }
                        target="_blank"
                    >
                        <code>{metaData.contractAddress}</code>
                    </a>
                </p>
                <p>
                    ℹ️ The metadata stored into this contract is freely
                    available by calling <code>.getByAddress(address)</code> on
                    the contract. This function returns a tuple{" "}
                    <code>(address, name, ipfs)</code>. If Metadata has been
                    registered, JSON can be retrieved by looking up the IPFS
                    address.
                </p>
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
                        margin-right: 10px !important;
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
                    .normal {
                        font-weight: normal;
                    }
                    body {
                        margin-bottom: 4em;
                    }
                `}</style>
            </div>
        );
    }
}
