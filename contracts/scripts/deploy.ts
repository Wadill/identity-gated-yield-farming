import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const stakingToken = "0x...";
  const rewardToken = "0x...";
  const credentialService = "0x..."; 

  const IdentityVerifier = await ethers.getContractFactory("IdentityVerifier");
  const verifier = await IdentityVerifier.deploy(credentialService);
  await verifier.deployed();
  console.log("IdentityVerifier deployed to:", verifier.address);

  const YieldFarmingPool = await ethers.getContractFactory("YieldFarmingPool");
  const pool = await YieldFarmingPool.deploy(stakingToken, rewardToken, verifier.address);
  await pool.deployed();
  console.log("YieldFarmingPool deployed to:", pool.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});