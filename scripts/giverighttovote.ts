import { Contract, ethers, Signer } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { getAddress, getContractAddress, isAddress } from "ethers/lib/utils";
import { ContractFunction, ContractFunctionType } from "hardhat/internal/hardhat-network/stack-traces/model";
import { sign } from "crypto";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
dotenv.config()



function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }

async function main()  {
    // console.log("Deploying");
    // console.log("proposals: ")
    const contractAddress = "0xe5f683a8c2ce61a8ec2f0cdc375da1dee8b7e4ab";
    const contractAddressLast = "0x9112d7234C6EEB135706F36bb0fDc1591c51F98F"
    const contractAddressLast2 = "0x046C9e1878246EB431Ce23664Ab663b5dACEe060"
    // const contractAddressCoWork = "0x4933ef805602f6fa6cf4f3263510c95d30912d69"
    const targetAddress2 = "0xD2A40840c4584a6419A5eA5Fff923c5556e86596";
    const targetAddress3 = "0xe7dE74F237Cda96869283ccDda22817982f19e86";
    const targetAddress4 = "0x6f6eb030334642D3D1527B3D1b05fb08C16852d5";
    const targetAddress5 = "0xBE5B70bD08D22fA8589096CC6c72236FecF3e1c3";
const targetAddress6 = "0xE684E017d41D4AB9F924a572a316C4BEa9e4152f";
const targetAddressDeployer = "0x2924a6C59115299A5945cA1dF6D73ABA526C97bd";
    // const targetAddress = process.argv[2]
   
    const provider = ethers.getDefaultProvider("goerli", {infura: process.env.INFURA_API_KEY});
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ??"");
    const signer = wallet.connect(provider);
    // console.log(`${signer.address}`) 
    // const balance = await signer.getBalance();
    // console.log(`this address has balance of ${balance}`)
    
    const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = await ballotContractFactory.attach(
      contractAddressLast2);

    const chairpensonTest = await ballotContract.chairperson();
    console.log(`this is the chairperson ${chairpensonTest}`);

    const chairpensonVoter = await ballotContract.voters(signer.address);
    console.log(`this is the vote of chairperson ${chairpensonVoter}`)

    const winnerName = await ballotContract.winnerName();
    console.log(`this is the vote of winnerName ${winnerName}`)

    const voters = await ballotContract.voters(targetAddress4);
    console.log(`this is the voters for address4 ${voters}`)

    const VoterWinning = await ballotContract.winningProposal();
    console.log(`this is the voter winning ${VoterWinning}`)

    const proposalView = await ballotContract.proposals(1)
    console.log(`this is the proposal select me for view ${proposalView}`)

    // const Vote = await ballotContract.vote(1);
    // console.log(Vote)

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
