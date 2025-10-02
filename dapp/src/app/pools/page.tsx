"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { WalletConnect } from "../../components/WalletConnect";
import { CredentialStatus } from "../../components/CredentialStatus";
import { PoolCard } from "../../components/PoolCard";
import { getIdentityVerifier, getYieldFarmingPool, getProvider } from "../../lib/ethers";
import { PoolData } from "../../types";

export default function Pools() {
  const [account, setAccount] = useState<string | null>(null);
  const [pools, setPools] = useState<PoolData[]>([]);
  const poolAddress = "0x..."; 
  const identityVerifierAddress = "0x..."; 

  useEffect(() => {
    const fetchData = async () => {
      if (!account) return;
      const provider = getProvider();
      const identityVerifier = getIdentityVerifier(identityVerifierAddress, provider);
      const poolContract = getYieldFarmingPool(poolAddress, provider);

      const apy = Number(ethers.utils.formatEther(await identityVerifier.getUserAPY(account)));
      const balance = "1000"; // Mocked token balance
      const stakedAmount = ethers.utils.formatEther(await poolContract.userInfo(account).amount);

      setPools([{ address: poolAddress, apy, balance, stakedAmount }]);
    };
    fetchData();
  }, [account]);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Identity-Gated Yield Farming</h1>
      <WalletConnect />
      {account && <CredentialStatus identityVerifierAddress={identityVerifierAddress} account={account} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {pools.map((pool) => (
          <PoolCard key={pool.address} pool={pool} />
        ))}
      </div>
    </div>
  );
}