import Eth from "ethjs";
import abi from "../abi/luckylist.json";
const eth = new Eth(
    new Eth.HttpProvider(
        `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API}`,
    ),
);

export default class LuckyList {
    constructor() {
        this.contract_address = "0x470e5d1a483a004a947a059f69c4b60499188b3d";
        this.contract = eth.contract(abi).at(this.contract_address);
        this.price = 0;
        this.total = 0;
    }

    isValidAddress(address) {
        if (address && address.length === 42) return Eth.isAddress(address);
    }

    async getRandom() {
        let current_index = await this.contract.getIndex();
        // console.log(current_index[0].toNumber());
        let randomIndex = Math.floor(
            Math.random() * current_index[0].toNumber(),
        );
        // console.log(randomIndex);

        return this.contract
            .getLucky(randomIndex)
            .then(result => {
                // console.log(result);
                if (result[0]) {
                    return result[0];
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    async getPrice() {
        return this.contract
            .getPrice()
            .then(result => {
                let price = Eth.fromWei(result[0], "ether");
                this.price = result[0];
                // console.log(price);
                return price;
            })
            .catch(err => {
                console.error(err);
            });
    }

    async addLucky(address) {
        return this.contract
            .addAddress(address, {
                from: window.web3.eth.accounts[0],
                value: this.price,
            })
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.error(err);
            });
    }

    async getCurrentAccount() {
        return new Promise((resolve, reject) => {
            if (
                typeof window.web3 !== "undefined" &&
                typeof window.web3.currentProvider !== "undefined"
            ) {
                eth.setProvider(window.web3.currentProvider);
                // console.log(web3.eth.accounts);
                resolve(window.web3.eth.accounts[0]);
            } else {
                reject();
            }
        });
    }
}
