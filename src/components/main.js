import React from "react";
import metadata from "../js/metadata.js";
import LuckyList from "./luckylist";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MagicDropzone from "react-magic-dropzone";
import JSONPretty from "react-json-pretty";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

let metaData = {};

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address,
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
            saveSymbol: "",
            saveDecimals: 18,
            saveInterfaces: [],
            isToken: false,
        };
    }

    componentWillMount() {
        metaData = new metadata();
        metaData.getPrice().then(result => {
            // console.log(result);
            this.setState({ price: result });
        });
        if (this.props.params && this.props.params.address) {
            let match = this.props.params.address;
            this.setState({ address: match });
            this.viewAddress(match);
            this.editAddress(match).catch(err => {
                this.setState({ saveAddress: match });
            });
        } else {
            this.setState({ address: metaData.contractAddress });
            this.viewAddress(metaData.contractAddress);
        }
    }

    componentDidMount() {
        metaData.getMetamask();
        metaData.getNetwork().then(result => {
            this.setState({ network: parseInt(result, 10) });
        });
    }

    onInputChange = async e => {
        // console.log(e.target.value);
        this.setState({
            address: e.target.value,
        });
    };

    viewAddress = address => {
        metaData.getAddressData(address).then(contractdata => {
            // console.log(contractdata);
            this.setState({ address: address });
            if (
                !contractdata ||
                !contractdata.data ||
                !contractdata.data.metadata
            )
                return;
            if (contractdata.data.metadata.logo) {
                let image = contractdata.data.metadata.logo;
                this.setState({ logo: image });
            } else {
                this.setState({ logo: "" });
            }
            this.setState({ metadata: contractdata });
        });
    };

    editAddress = address => {
        this.setState({ saveAddress: address });
        if (this.state.metadata && this.state.metadata.address === address) {
            return this.populateEditor(this.state.metadata);
        }
        return metaData.getAddressData(address).then(contractdata => {
            // console.log(contractdata);
            this.populateEditor(contractdata);
        });
    };

    populateEditor(contractdata) {
        if (!contractdata.data || !contractdata.data.metadata) return;
        let md = contractdata.data.metadata;
        if (md.logo) {
            let image = md.logo;
            this.setState({ logo: image, saveFile: image });
        }
        if (md.token.ticker.length > 0) {
            this.setState({
                isToken: true,
                saveSymbol: md.token.ticker,
                saveDecimals: md.token.decimals,
                saveInterfaces: md.contract.interfaces,
            });
        }
        this.setState({
            saveName: md.name,
            saveUrl: md.url,
            saveDescription: md.description,
            saveAddress: contractdata.address,
            saveScam: md.reputation.category === "Scam",
        });
        this.forceUpdate();
        this.setState({ metadata: contractdata });
    }

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
        if (this.state.isToken === true) {
            // console.log("WHY");
            let interfaces = this.state.saveInterfaces.split(",").map(Number);
            data.metadata.contract.interfaces = interfaces;
            data.metadata.token.ticker = this.state.saveSymbol;
            data.metadata.token.decimals = this.state.saveDecimals;
        }
        if (this.state.file)
            data.metadata.logo = await metaData.convertBlobToBase64(
                this.state.file,
            );
        else if (this.state.saveFile) {
            data.metadata.logo = this.state.saveFile;
        }
        console.log(data);
        metaData
            .storeMetadata(data.address, this.state.saveName, data)
            .then(response => {
                this.setState({ address: this.state.saveAddress });
            });
    };

    onViewAddress = e => {
        this.viewAddress(this.state.address);
    };

    onEditAddress = e => {
        this.editAddress(this.state.address);
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
                    position: "relative",
                    left: 0,
                }}
                alt="Uploaded logo"
            />
        ) : this.state.saveFile ? (
            <img
                src={this.state.saveFile}
                style={{
                    width: 64,
                    height: 64,
                    position: "relative",
                    left: 0,
                }}
                alt="Uploaded logo"
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
                {!this.props.params.address ? <LuckyList /> : ""}
                <h1>Metadata Uploader</h1>
                <p style={{ fontSize: "90%" }}>
                    <span>
                        <b style={{ color: "#00ffd9" }}>
                            <span role="img" aria-label="warning">
                                ⚠️
                            </span>{" "}
                            Warning:
                        </b>{" "}
                        this is a prototype registry contract, data may be lost
                        (but still counts as a donation!)
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
                                    checked={this.state.isToken}
                                    onChange={this.handleSaveCheck("isToken")}
                                    color="primary"
                                />
                            }
                            label="Is this a Token?"
                        />
                    </FormGroup>
                    <div
                        className={
                            (this.state.isToken ? "expanded " : "") +
                            "formExpanded"
                        }
                    >
                        <FormGroup row>
                            <TextField
                                label="Token Ticker Symbol"
                                value={this.state.saveSymbol}
                                onChange={this.handleSaveChange("saveSymbol")}
                                style={{ width: "49%", marginRight: "2%" }}
                            />
                            <TextField
                                label="Decimals"
                                value={this.state.saveDecimals}
                                onChange={this.handleSaveChange("saveDecimals")}
                                style={{ width: "49%" }}
                            />
                        </FormGroup>
                        <TextField
                            label="Supported Interfaces"
                            value={this.state.saveInterfaces}
                            placeholder="20, 721, 165"
                            onChange={this.handleSaveChange("saveInterfaces")}
                            fullWidth
                            helperText="Interfaces supported by this Token separated by comma"
                        />
                    </div>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.saveScam}
                                    onChange={this.handleSaveCheck("saveScam")}
                                />
                            }
                            label="Report as scam"
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
                        <Button variant="outlined" disabled size="small">
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
                        this.state.address !== "" &&
                        !metaData.isValidAddress(this.state.address) &&
                        this.state.address.length > 0
                    }
                    value={this.state.address}
                    onChange={this.onInputChange}
                    className="top-padding monofont"
                />
                <img
                    src={this.state.logo}
                    style={{
                        width: 64,
                        height: 64,
                        position: "relative",
                        left: 0,
                        marginTop: 15,
                    }}
                    alt="Uploaded logo"
                />
                <div className="button-aligner">
                    <Button
                        disabled={!metaData.isValidAddress(this.state.address)}
                        size="small"
                        variant="contained"
                        onClick={this.onEditAddress}
                        className={"button"}
                    >
                        Edit
                    </Button>
                    <Button
                        disabled={!metaData.isValidAddress(this.state.address)}
                        size="small"
                        variant="contained"
                        onClick={this.onViewAddress}
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
                <JSONPretty json={JSON.stringify(this.state.metadata.data)} />
                <br />
                <br />
                <h1>Further Reading</h1>
                <p>
                    <span role="img" aria-label="ethtective">
                        🕵️
                    </span>{" "}
                    Mainnet Metadata Prototype Contract:{" "}
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
                    <span role="img" aria-label="info">
                        ℹ️
                    </span>{" "}
                    The metadata stored into this contract is freely available
                    by calling <code>.getByAddress(address)</code> on the
                    contract. This function returns a tuple{" "}
                    <code>(address, name, ipfs)</code>. If Metadata has been
                    registered, JSON can be retrieved by looking up the IPFS
                    address.
                </p>
            </div>
        );
    }
}
