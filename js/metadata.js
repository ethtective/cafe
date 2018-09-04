import Eth from "ethjs";
import eip55 from "eip55";
import abi from "../abi/metadata.json";
import IPFS from "ipfs-mini";
let reader = {};
const eth = new Eth(new Eth.HttpProvider("https://ropsten.infura.io"));
const ethRead = new Eth(new Eth.HttpProvider("https://ropsten.infura.io"));

const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

export default class MetaDataContract {
    constructor() {
        this.contract_address = "0x7f0b2a8c93db220637f835ef075e3dbc17beff7d";
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

    //this is deprecated
    async getAddress(address) {
        console.error("deprecated", this);
        return this.contractView
            .getByAddress(eip55.encode(address))
            .then(result => {
                // console.log(result);
                result[0] = eip55.encode(result[0]);
                return {
                    address: result[0],
                    name: result[1],
                    image: result[2],
                };
            })
            .catch(err => {
                console.error(err);
            });
    }

    async retrieveDataJSON(address) {
        return this.contractView
            .getByAddress(address)
            .then(result => {
                //TODO: check if valid IPFS link
                return this.lookUpPromise(result[2]).then(ipfs => {
                    return {
                        address: result[0],
                        name: result[1],
                        data: ipfs,
                    };
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    async saveDataJSON(address, data) {}

    async lookUpPromise(address) {
        return new Promise((resolve, reject) => {
            ipfs.cat(address, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    //this is deprecated
    async lookUp(address, callback) {
        console.error("deprecated", this);
        ipfs.cat(address, (err, result) => {
            // console.log(result);
            callback(result);
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

    async addMetaData(address, name, image) {
        let base64 = await this.convertBlobToBase64(image);
        return new Promise((resolve, reject) => {
            ipfs.add(base64, (err, result) => {
                console.log(result);
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
}
