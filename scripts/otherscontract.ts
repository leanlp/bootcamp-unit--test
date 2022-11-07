import { Contract, ethers, Signer } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { getAddress, getContractAddress, isAddress } from "ethers/lib/utils";
import { ContractFunction, ContractFunctionType } from "hardhat/internal/hardhat-network/stack-traces/model";
dotenv.config()



async function main()  {
    const contractAddressMintNFT = "0x189462ABf43028A13Fa0F7fEEA53E2f74cC3f0B6";
    const contractAddressLast = "0x9112d7234C6EEB135706F36bb0fDc1591c51F98F"
    const contractAddressLast2 = "0x046C9e1878246EB431Ce23664Ab663b5dACEe060"
    const targetAddress2 = "0xD2A40840c4584a6419A5eA5Fff923c5556e86596";
    const targetAddress3 = "0xe7dE74F237Cda96869283ccDda22817982f19e86";
    const targetAddress4 = "0x6f6eb030334642D3D1527B3D1b05fb08C16852d5";
    const targetAddress5 = "0xBE5B70bD08D22fA8589096CC6c72236FecF3e1c3";
const targetAddress6 = "0xE684E017d41D4AB9F924a572a316C4BEa9e4152f";
    // const targetAddress = process.argv[2]
   
    const provider = ethers.getDefaultProvider("goerli", {infura: process.env.INFURA_API_KEY});
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ??"");
    const signer = wallet.connect(provider);
    console.log(`${signer.address}`) 
    // const balance = await signer.getBalance();
    // console.log(`this address has balance of ${balance}`)
    
    const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = await ballotContractFactory.attach(
      contractAddressMintNFT);

    // const chairpensonTest = await ballotContract.chairperson();
    // console.log(chairpensonTest);
    // const chairpensonVoter = await ballotContract.voters(signer.address);
    // console.log(chairpensonVoter)
    // const Voter = await ballotContract.voters;
    // console.log(Voter)

    // const Vote = await ballotContract.vote(1);
    // console.log(Vote)

    // const VoterWinning = await ballotContract.winningProposal();
    // console.log(VoterWinning)

    //     const delegate2 = await ballotContract.delegate(targetAddress3);
    //     await delegate2.wait();
    // console.log(delegate2.hash)
   
      
    // const tx= await ballotContract.giveRightToVote(targetAddress6);
    // await tx.wait();
    //   console.log(tx.hash);
    //   console.log(`this is of txhash of the giveRightToVote ${tx.hash}`)
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
