import React from "react";
import LuckyList from "./luckylist";
import LoginDropdown from "./loginDropdown";

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: this.props.address,
        };
    }

    ethtective = () => {
        window.open(
            "https://canary.ethtective.com/" + this.state.address,
            "_blank",
        );
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
                    saveAddress: "",
                }}
            >
                <br />
                <h1>
                    ΞTH
                    <span className="logoblue">TECTIVE</span>
                </h1>
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
                <LoginDropdown />

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
                    <a href="https://www.ethtective.com/0x09ca59e18c58f25b092a0f2670928f5d0656a331&">
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
