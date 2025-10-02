import { useState } from "react";
import { ethers } from "ethers";
import { getYieldFarmingPool, getProvider } from "../lib/ethers";
import { PoolData } from "../types";

interface Props {
  pool: PoolData;
}

export const PoolCard: React.FC<Props> = ({ pool }) => {
  const [amount, setAmount] = useState<string>("");

  const stake = async () => {
    try {
      const provider = getProvider();
      const signer = provider.getSigner();
      const contract = getYieldFarmingPool(pool.address, signer);
      const tx = await contract.stake(ethers.utils.parseEther(amount));
      await tx.wait();
      alert("Staked successfully!");
    } catch (error) {
      console.error("Staking failed:", error);
      alert("Staking failed!");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Yield Farming Pool</h2>
      <p>APY: {pool.apy}%</p>
      <p>Balance: {pool.balance} tokens</p>
      <p>Staked: {pool.stakedAmount} tokens</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
        placeholder="Amount to stake"
      />
      <button
        onClick={stake}
        className="mt-4 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Stake
      </button>
    </div>
  );
};