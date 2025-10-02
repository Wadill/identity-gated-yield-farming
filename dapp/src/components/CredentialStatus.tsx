import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getIdentityVerifier, getProvider } from "../lib/ethers";
import { CredentialStatus } from "../types";

interface Props {
  identityVerifierAddress: string;
  account: string | null;
}

export const CredentialStatus: React.FC<Props> = ({ identityVerifierAddress, account }) => {
  const [status, setStatus] = useState<CredentialStatus>({ isCompliant: false, score: 0 });

  useEffect(() => {
    const fetchStatus = async () => {
      if (!account) return;
      const provider = getProvider();
      const identityVerifier = getIdentityVerifier(identityVerifierAddress, provider);
      const isCompliant = await identityVerifier.isVerified(account);
      const score = Number(await identityVerifier.getCredentialScore(account)); // Mocked or from Moca SDK
      setStatus({ isCompliant, score });
    };
    fetchStatus();
  }, [account, identityVerifierAddress]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-bold">Credential Status</h3>
      <p>Compliance: {status.isCompliant ? "Verified" : "Not Verified"}</p>
      <p>Score: {status.score}</p>
    </div>
  );
};