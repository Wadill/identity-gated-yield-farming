import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider } from "../lib/ethers";
import { AIRAccountService } from "moca-sdk"; // Hypothetical Moca SDK

export const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const provider = getProvider();
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // Initialize Moca AIR Account Service
      const airAccount = new AIRAccountService();
      await airAccount.init(address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
    </button>
  );
};