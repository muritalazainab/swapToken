import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TokenModule = buildModule("TokenModule", (t) => {
  const token = t.contract("Celo");

  return { token };
});

export default TokenModule;