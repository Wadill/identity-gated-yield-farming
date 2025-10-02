import { ethers } from "ethers";
import YieldFarmingPoolABI from "./contracts/YieldFarmingPool.json";
import IdentityVerifierABI from "./contracts/IdentityVerifier.json";

export const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

export const getYieldFarmingPool = (address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) => {
  return new ethers.Contract(address, YieldFarmingPoolABI.abi, signerOrProvider);
};

export const getIdentityVerifier = (address: string, signerOrProvider: ethers.Signer | ethers.providers.Provider) => {
  return new ethers.Contract(address, IdentityVerifierABI.abi, signerOrProvider);
};