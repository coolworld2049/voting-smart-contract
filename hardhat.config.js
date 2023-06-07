require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-deploy');
require('dotenv').config()

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "buildbear",
  networks: {
    buildbear: {
      url: `https://rpc.buildbear.io/${process.env.BUILDBEAR_APP_ID}`
    }
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: Number(process.env.BUILDBEAR_CHAIN_ID),
        urls: {
          apiURL: `https://rpc.buildbear.io/verify/etherscan/${process.env.BUILDBEAR_APP_ID}`,
          browserURL: `https://explorer.buildbear.io/${process.env.BUILDBEAR_APP_ID}`,
        },
      },
    ],
  }
};
