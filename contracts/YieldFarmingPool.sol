pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IdentityVerifier.sol";

contract YieldFarmingPool {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    IdentityVerifier public identityVerifier;

    struct UserInfo {
        uint256 amount; // Staked amount
        uint256 rewardDebt; // Rewards owed
        uint256 apy; // User-specific APY (scaled by 1e18)
    }

    mapping(address => UserInfo) public userInfo;
    uint256 public totalStaked;
    uint256 public lastRewardBlock;
    uint256 public rewardPerBlock;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _stakingToken, address _rewardToken, address _identityVerifier) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
        identityVerifier = IdentityVerifier(_identityVerifier);
        rewardPerBlock = 1e18; // Example: 1 token per block
        lastRewardBlock = block.number;
    }

    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        require(identityVerifier.isVerified(msg.sender), "User not verified");

        UserInfo storage user = userInfo[msg.sender];
        updatePool();

        if (user.amount > 0) {
            uint256 pending = (user.amount * user.apy * (block.number - lastRewardBlock)) / 1e18;
            rewardToken.transfer(msg.sender, pending);
            emit RewardClaimed(msg.sender, pending);
        }

        stakingToken.transferFrom(msg.sender, address(this), _amount);
        user.amount += _amount;
        user.apy = identityVerifier.getUserAPY(msg.sender);
        user.rewardDebt = (user.amount * user.apy) / 1e18;
        totalStaked += _amount;

        emit Staked(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, "Insufficient balance");

        updatePool();
        uint256 pending = (user.amount * user.apy * (block.number - lastRewardBlock)) / 1e18;
        if (pending > 0) {
            rewardToken.transfer(msg.sender, pending);
            emit RewardClaimed(msg.sender, pending);
        }

        user.amount -= _amount;
        user.rewardDebt = (user.amount * user.apy) / 1e18;
        totalStaked -= _amount;
        stakingToken.transfer(msg.sender, _amount);

        emit Withdrawn(msg.sender, _amount);
    }

    function updatePool() internal {
        lastRewardBlock = block.number;
    }
}