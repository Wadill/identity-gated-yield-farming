import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    mocaTestnet: {
      url: "https://testnet.mocachain.network", 
      accounts: ["PRIVATE_KEY"],
    },
  },
};

export default config;