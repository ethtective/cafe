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
            isContract: false,
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
            // hope is a great thing
            this.populateViewer(address, contractdata);
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

    populateViewer(address, contractdata) {
        this.setState({ address: address });
        if (!contractdata || !contractdata.data || !contractdata.data.metadata)
            return;
        if (contractdata.data.metadata.logo) {
            let image = contractdata.data.metadata.logo;
            this.setState({ logo: image });
        } else {
            this.setState({ logo: "" });
        }
        this.setState({ metadata: contractdata });
    }

    populateEditor(contractdata) {
        if (!contractdata.data || !contractdata.data.metadata) return;
        this.populateViewer(contractdata.address, contractdata);
        let empty = metaData.getEmptyObject();
        console.log(empty, contractdata.data);
        Object.assign(empty, contractdata.data); //adding empty fields from previous versions
        let cd = empty;
        let md = cd.metadata;
        console.log(cd);
        if (md.logo) {
            let image = md.logo;
            this.setState({ logo: image, saveFile: image });
        }
        if (md.token && md.token.ticker && md.token.ticker.length > 0) {
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
                <br />
                <h1>ΞTHTECTIVE</h1>
                <p>
                    <span role="img" aria-label="ethtective">
                        ☕
                    </span>{" "}
                    Ξthtective is an alternative Ethereum explorer focused on
                    showing relationships and transactions between addresses.
                    Use it to sniff out the flow of Ether and Tokens. See how
                    scams are actually leading back to the same
                    {"  "}
                    <span role="img" aria-label="ethtective">
                        🐋
                    </span>
                    (yeah it's a whale). Observe the historical activity of
                    famous addresses such as the Dao. Find the bastard that
                    hacked your wallet; and if he participated in an ICO with
                    KYC call law enforcement.
                </p>
                <p>
                    {" "}
                    <span role="img" aria-label="ethtective">
                        🕵️
                    </span>
                    It is no longer a fantasy. We make it all possible.
                    Everything is connected.
                </p>
                <LuckyList />

                <h1>Contributing</h1>
                <p>
                    <span role="img" aria-label="ethtective">
                        🎁
                    </span>{" "}
                    We're a privately funded operation and hope to offer a more
                    user friendly experience than regular block explorers.
                    Donations are welcome to help the (literally) starving
                    developers of this tool, luckily our users are{" "}
                    <a href="https://www.ethtective.com/0xfa129dce2215e3f16aa9b1bd31601873206157c5&">
                        famously generous
                    </a>
                </p>
                <p>
                    <span role="img" aria-label="ethtective">
                        🤖
                    </span>{" "}
                    Are you a robot?{" "}
                    <a href="https://www.github.com/ethtective">
                        Help us with this code thing
                    </a>
                    , we're open sourcing the hell out of this.
                </p>
            </div>
        );
    }
}
