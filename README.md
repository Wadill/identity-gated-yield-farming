# Identity-Gated Yield Farming Pools

Welcome to the **Identity-Gated Yield Farming Pools** project, a decentralized application (dApp) built for the **Moca Network**.

This dApp leverages **Moca Chain's privacy-preserving identity infrastructure** to create **DeFi yield farming pools** that dynamically adjust APYs based on verified user credentials (e.g., **zkKYC, on-chain credit scores**). It enhances security, attracts regulated institutions, and empowers users with **reputation-driven rewards**.


## Features

* **Dynamic APY Adjustment**: APYs (5–15%) scale with verified credentials such as zkKYC compliance and on-chain credit scores.
* **Identity Verification**: Uses **Moca Credential Services** for privacy-preserving pool access.
* **Seamless Onboarding**: AIR Account Services streamline wallet creation and login.
* **Risk Management**: Attracts institutional users with secure, identity-verified pools.
* **Responsive UI**: Built with **Next.js + Tailwind CSS** for smooth user experiences.

---

## Folder Structure

```
identity-gated-yield-farming/
├── frontend/                    
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   ├── pools/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── PoolCard.tsx
│   │   │   └── CredentialStatus.tsx
│   │   ├── lib/
│   │   │   ├── ethers.ts
│   │   │   └── contracts/
│   │   │       ├── YieldFarmingPool.json
│   │   │       └── IdentityVerifier.json
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── tsconfig.json
│   └── package.json
├── contracts/                   
│   ├── YieldFarmingPool.sol
│   ├── IdentityVerifier.sol
│   └── artifacts/
├── scripts/                     
│   └── deploy.ts
├── hardhat.config.ts            
├── README.md                    
└── Dockerfile                   
```

---

## Installation

### Prerequisites

* Node.js (v18+)
* npm or yarn
* MetaMask or compatible wallet
* Moca Chain Testnet access: `https://testnet.mocachain.network`

### Steps

**1. Clone the Repository**

```bash
git clone https://github.com/Wadill/identity-gated-yield-farming.git
cd identity-gated-yield-farming
```

**2. Install Backend Dependencies**

```bash
npm install --prefix contracts
```

**3. Install Frontend Dependencies**

```bash
cd frontend
npm install
```

**4. Configure Environment**
Create a `.env` file in the root:

```
PRIVATE_KEY=your_testnet_private_key
```

Update `hardhat.config.ts` with Moca testnet details if required.

---

## Usage

**Start the Frontend**

```bash
cd frontend
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

**Steps**:

1. Connect wallet (MetaMask → Moca testnet).
2. Initialize with AIR Account Services.
3. View credential status → Stake tokens → Claim rewards.

---

## Deployment

**Deploy Smart Contracts**

```bash
npx hardhat run scripts/deploy.ts --network mocaTestnet
```

*Save contract addresses (YieldFarmingPool, IdentityVerifier).*

**Build Frontend**

```bash
cd frontend
npm run build
```

**Docker Deployment**

```bash
docker build -t yield-farming-dapp .
docker run -p 3000:3000 yield-farming-dapp
```

Access via [http://localhost:3000](http://localhost:3000).

---

## Testing

**Smart Contracts**

```bash
npx hardhat test
```

**Frontend**

```bash
cd frontend
npm test
```

---

## Demo

* **Video:** *(To be uploaded – showcases wallet connection, credential verification, staking, and APY adjustment)*
* **Live Testnet:** *(TBD – add deployment link)*

---

## Technologies Used

* **Blockchain**: Solidity, Hardhat, Moca Chain
* **Frontend**: Next.js, TypeScript, Tailwind CSS
* **Interactions**: Ethers.js
* **Identity**: Moca Network SDK (AIR Account, Credential Services)
* **Testing**: Mocha, Chai, Jest
* **Deployment**: Docker

---

## Challenges Faced

* Integration delays due to **limited SDK documentation**.
* Gas optimization issues for **dynamic APY calculations**.
* Had to mock credential data for early testing.
* Balancing **privacy, compliance, and usability**.

---

## What We Learned

* Identity verification **boosts DeFi trust** and attracts institutions.
* Scalable **UI/UX design** is critical for onboarding.
* Learned the importance of **gas efficiency** and early SDK prototyping.

---

## What's Next

* Deploy on **Moca Mainnet**.
* Introduce **\$MOCA token rewards**.
* Enable **cross-chain identity verification**.
* Explore partnerships with **Animoca Brands’ ecosystem**.

---

## Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch
3. Submit a PR
