pragma solidity ^0.8.20;

interface IMocaCredentialService {
    function getCredentialScore(address user) external view returns (uint256);
    function isCompliant(address user) external view returns (bool);
}

contract IdentityVerifier {
    IMocaCredentialService public credentialService;
    uint256 public constant MIN_SCORE = 50;
    uint256 public constant MAX_SCORE = 100;
    uint256 public constant BASE_APY = 5e18; // 5%
    uint256 public constant MAX_APY = 15e18; // 15%

    constructor(address _credentialService) {
        credentialService = IMocaCredentialService(_credentialService);
    }

    function isVerified(address user) public view returns (bool) {
        return credentialService.isCompliant(user) && credentialService.getCredentialScore(user) >= MIN_SCORE;
    }

    function getUserAPY(address user) public view returns (uint256) {
        if (!credentialService.isCompliant(user)) return 0;
        uint256 score = credentialService.getCredentialScore(user);
        if (score < MIN_SCORE) return 0;
        // Linear APY scaling: 5% to 15% based on score (50-100)
        return BASE_APY + ((score - MIN_SCORE) * (MAX_APY - BASE_APY)) / (MAX_SCORE - MIN_SCORE);
    }
}