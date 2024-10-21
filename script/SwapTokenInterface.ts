import hre from "hardhat";
async function main() {
    const DEPLOYED_SWAPTOKEN_CONTRACT =
        "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    const swapTokenContractInstance = await hre.ethers.getContractAt(
        "SwapToken",
        DEPLOYED_SWAPTOKEN_CONTRACT
    );
    console.log("#################### Deploying swap token #######################################")
    const amount = hre.ethers.parseUnits("500", 18);


    const swapTokens = await swapTokenContractInstance.swapTokenCeloToTokenBase(amount);
    swapTokens.wait();
    console.log({ "Token swap sucessfully": swapTokens });
    const swapTokenbase = await swapTokenContractInstance.swapTokenBaseToTokenCelo(amount);
    swapTokenbase.wait();
    console.log({ "Token swap sucessfully": swapTokenbase });

}
 main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })