// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "./ISwapToken.sol";

contract SwapToken {
    IERC20 public celo;
    IERC20 public base;

    uint256 public tokenCeloSwapRate;
    uint256 public tokenBaseSwapRate;

    constructor(
      address _celo,
      address _base,
      uint256 _tokenCeloSwapRate,
      uint256 _tokenBaseSwapRate
    ) {
      celo = IERC20(_celo);
      base = IERC20(_base);
      tokenCeloSwapRate = _tokenCeloSwapRate;
      tokenBaseSwapRate = _tokenBaseSwapRate;
    }

    function swapTokenCeloToTokenBase(uint256 amountA) public {
        require(msg.sender != address(0), "Zero address not allowed");
        uint256 amountB = amountA * tokenCeloSwapRate;

        require(
            celo.balanceOf(msg.sender) >= amountA,
            "Not enough Token B in contract"
        );

        require(
            celo.transferFrom(msg.sender, address(this), amountA),
            "Token A transfer failed"
        );

        require(base.transfer(msg.sender, amountB), "Token B transfer failed");
    }

    function swapTokenBaseToTokenCelo(uint256 amountB) public {
        require(msg.sender != address(0), "Zero address not allowed");
        uint256 amountA = amountB / tokenBaseSwapRate;

        require(
            base.balanceOf(address(this)) >= amountB,
            "Not enough Token A in contract"
        );

        require(
            base.transferFrom(msg.sender, address(this), amountB),
            "Token B transfer failed"
        );

        require(celo.transfer(msg.sender, amountA), "Token A transfer failed");
    }
}