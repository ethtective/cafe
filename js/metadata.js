import Eth from "ethjs";
import eip55 from "eip55";
import abi from "../abi/metadata.json";
import IPFS from "ipfs-mini";

let reader = {};
const eth = new Eth(new Eth.HttpProvider("https://ropsten.infura.io"));
const ethRead = new Eth(new Eth.HttpProvider("https://ropsten.infura.io"));
const json = {
    version: "0.2",
    address: "",
    submission: {
        comments: "",
        ipfs: [],
    },
    metadata: {
        name: "",
        url: "",
        logo: "",
        description: "",
        contact: [],
        contract: {
            abi: "",
            source: "",
            compiler_version: "",
            swarm_source: "",
            interfaces: [],
            erc: [],
        },
        reputation: {
            verified: [],
            status: "",
            category: "",
            subcategory: "",
            description: "",
            related: [],
        },
    },
    scamdb: {},
};
const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

export default class MetaDataContract {
    constructor() {
        this.contract_address = "0xe5a16d3ff0e4bd6204c05061f47c12264f315af4";
        this.contract = eth.contract(abi).at(this.contract_address);
        this.contractView = ethRead.contract(abi).at(this.contract_address);
        this.price = 0;
        this.eth = eth;
        reader = new FileReader();
        if (
            typeof window.web3 !== "undefined" &&
            typeof window.web3.currentProvider !== "undefined"
        ) {
            eth.setProvider(window.web3.currentProvider);
            // console.log("metamask!");
        } else {
            // keep current infura provider
            // console.log("yay");
        }
    }

    async getNetwork() {
        return eth.net_version();
    }

    async getPrice() {
        return this.contract.getPrice().then(result => {
            // console.log(result[0]);
            this.price = result[0];

            return Eth.fromWei(result[0], "ether");
        });
    }

    async getAddressData(address) {
        return this.contractView
            .getByAddress(address)
            .then(result => {
                //TODO: check if valid IPFS link
                // console.log(result);
                if (result[0] === "0x0000000000000000000000000000000000000000")
                    throw Error(`No metadata information for ${address}`);
                return this.lookUp(result[2]).then(ipfs => {
                    return {
                        address: result[0],
                        name: result[1],
                        data: ipfs,
                    };
                });
            })
            .catch(err => {
                throw Error(err);
            });
    }

    getEmptyObject() {
        return json;
    }

    async storeMetadata(address, data) {
        return new Promise((resolve, reject) => {
            ipfs.addJSON(data, (err, result) => {
                console.log(`IPFS Hash: ${result}`);
                if (err)
                    reject(new DOMException("Couldn't add metadata to IPFS"));
                return this.contract
                    .addAddress(address, name, result, {
                        from: web3.eth.accounts[0],
                        value: this.price,
                    })
                    .then(result => {
                        resolve(result);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        });
    }

    async convertBlobToBase64(blob) {
        console.log(blob);
        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Problem parsing input file."));
            };
            reader.onload = () => {
                resolve(reader.result);
            };
            console.log(blob);
            reader.readAsDataURL(blob[0]);
        });
    }

    async lookUp(address) {
        return new Promise((resolve, reject) => {
            ipfs.catJSON(address, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}
