export interface PoolData {
  address: string;
  apy: number;
  balance: string;
  stakedAmount: string;
}

export interface CredentialStatus {
  isCompliant: boolean;
  score: number;
}