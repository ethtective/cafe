import Lucky from "../js/luckylist";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

let luckyList;

export default class LuckyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0,
            saveLuckyAddress: "",
        };
    }

    handleSaveChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    onSubmit = async e => {
        luckyList.addLucky(this.state.saveLuckyAddress);
    };

    componentWillMount() {
        luckyList = new Lucky();
        luckyList.getPrice().then(response => {
            this.setState({ price: response });
        });
    }

    componentDidMount() {
        luckyList.getCurrentAccount().then(response => {
            // console.log(response);
            this.setState({ saveLuckyAddress: response });
            this.forceUpdate();
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h1>Lucky List</h1>
                <p>
                    🎊 Have you always wanted to be part of a select lucky few?
                    Now is your chance for a mere {this.state.price} Eth! The
                    Ξthtective Lucky List is open for submissions! Add an
                    address of your choice that users will discover when they
                    press "I'm Feeling Lucky".
                </p>
                <img src="lucky.png" />

                <form noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        error={
                            this.state.saveLuckyAddress.length > 0 &&
                            !luckyList.isValidAddress(
                                this.state.saveLuckyAddress,
                            )
                        }
                        required={true}
                        label="Address"
                        value={this.state.saveLuckyAddress}
                        onChange={this.handleSaveChange("saveLuckyAddress")}
                        className="top-padding monofont"
                    />
                    <div className="button-aligner">
                        <Button
                            disabled={
                                !luckyList.isValidAddress(
                                    this.state.saveLuckyAddress,
                                )
                            }
                            size="small"
                            variant="contained"
                            onClick={this.onSubmit}
                            className="button"
                        >
                            Add to Lucky List
                        </Button>
                        <Button variant="outlined" disabled>
                            {this.state.price} Ξ
                        </Button>
                    </div>
                </form>
                <style global jsx>{`
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
                `}</style>
                <br />
                <br />
                <br />
            </div>
        );
    }
}
