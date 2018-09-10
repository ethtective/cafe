import Eth from "ethjs";
import abi from "../abi/metadata.json";
import IPFS from "ipfs-mini";

const network = "mainnet";

let reader = {};
const eth = new Eth(new Eth.HttpProvider(`https://${network}.infura.io`));
const ethRead = new Eth(new Eth.HttpProvider(`https://${network}.infura.io`));

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
        token: {
            ticker: "",
            decimals: 18,
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
        this.contractAddress = "0x981e983f7ea0486195bce0a0460ba23e572d87ec";
        this.contract = eth.contract(abi).at(this.contractAddress);
        this.contractView = ethRead.contract(abi).at(this.contractAddress);
        this.price = 0;
    }

    getMetamask() {
        reader = new FileReader();
        if (
            typeof window.web3 !== "undefined" &&
            typeof window.web3.currentProvider !== "undefined"
        )
            eth.setProvider(window.web3.currentProvider);
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

    isValidAddress(address) {
        if (address && address.length === 42) return Eth.isAddress(address);
    }

    async getAddressData(address) {
        return this.contractView.getByAddress(address).then(result => {
            if (result[0] === "0x0000000000000000000000000000000000000000")
                return;
            return this.lookUp(result[2])
                .then(ipfs => {
                    return {
                        address: result[0],
                        name: result[1],
                        data: ipfs,
                    };
                })
                .catch(err => {
                    return {
                        address: result[0],
                        name: result[1],
                        data: { data: "no data for this address" },
                    };
                });
        });
    }

    getEmptyObject() {
        let newObj = Object.assign(json, {});
        return newObj;
    }

    async storeMetadata(address, _name, data) {
        return new Promise((resolve, reject) => {
            ipfs.addJSON(data, (err, result) => {
                console.log(`IPFS Hash: ${result}`);
                if (result === undefined || err)
                    reject(new DOMException("Couldn't add metadata to IPFS"));
                if (
                    window.web3.eth.accounts[0] ===
                    "0x09ca59e18c58f25b092a0f2670928f5d0656a331"
                )
                    return this.saveByOwner(address, _name, result, {
                        from: window.web3.eth.accounts[0],
                    });
                return this.contract
                    .addAddress(address, _name, result, {
                        from: window.web3.eth.accounts[0],
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

    async saveByOwner(address, _name, result) {
        return this.contract
            .addByOwner(address, _name, result, {
                from: window.web3.eth.accounts[0],
            })
            .then(result => {
                return result;
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
        if (address);
        return new Promise((resolve, reject) => {
            ipfs.catJSON(address, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}
