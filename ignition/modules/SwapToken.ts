import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SwapTokenModule = buildModule("SwapTokenModule", (t) => {
  const celoToken = t.contract("Celo", ["0xac9535B43e7f652344A158FaB8e44472A1070299"]);

  const baseToken = t.contract("Base", ["0xac9535B43e7f652344A158FaB8e44472A1070299"]);

  const swapToken = t.contract("SwapToken", [celoToken, baseToken, 100, 200]);

  return { swapToken };
});

export default SwapTokenModule;