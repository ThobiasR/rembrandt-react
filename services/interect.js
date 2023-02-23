import Web3 from "web3";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const env = process.env.NEXT_PUBLIC_ENV;
const web3 = new Web3(Web3.givenProvider);
const contractABI = require("services/NFT.json");

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: true,
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <p className="mb-1 mt-1">
          <a
            target="_blank"
            href={`https://metamask.io/download.html`}
            rel="noreferrer"
            style={{ color: "white", textDecoration: "none" }}
          >
            You must install Metamask, a virtual Ethereum wallet, in your
            browser. Click here to install
          </a>
        </p>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const ethPayment = async (noOfNft, price, isMobile) => {
  const networkId = window.ethereum.networkVersion;
  if (env === "production" && networkId != 1) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: web3.utils.toHex(1) }],
    });
  }

  window.contract = await new web3.eth.Contract(
    contractABI.abi,
    contractAddress
  );

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress,
    from: window.ethereum.selectedAddress,
    data: window.contract.methods.mint(noOfNft).encodeABI(),
    value: parseInt(web3.utils.toWei(price, "ether")).toString(16),
    // gas: "75000",
    // gasLimit: "310000"
  };

  //sign transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    return {
      success: true,
      status: txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "Something went wrong: " + error.message,
      code: error.code,
    };
  }
};

export const getConfirmations = async (txHash) => {
  try {
    // Get transaction details
    const trx = await web3.eth.getTransactionReceipt(txHash);
    console.log("trx", trx);
    return trx === null ? 0 : trx.status;
  } catch (error) {
    console.log(error);
  }
};
