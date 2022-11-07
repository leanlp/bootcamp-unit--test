import { ethers, Signer } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
dotenv.config()

const PROPOSALS = ["Chocolate", "Vanilla", "Lemon", "Cookie", "DulceOfMilk"];

function convertStringArrayToBytes32(array: string[]) {
    const bytes32Array = [];
    for (let index = 0; index < array.length; index++) {
      bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
    }
    return bytes32Array;
  }

async function main()  {
    console.log("Deploying");
    console.log("proposals: ")
    const proposals = process.argv.slice(2);
    proposals.forEach((element, index) => {
        console.log(`Proposal N. ${index +1}: ${element}`)
    })
    
    const provider = ethers.getDefaultProvider("goerli", {infura: process.env.INFURA_API_KEY});
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ??"");
    const signer = wallet.connect(provider);
    console.log(`${signer.address}`)
    const balance = await signer.getBalance();
    console.log(`this address has balance of ${balance}`)
    
    const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = await ballotContractFactory.deploy(
        convertStringArrayToBytes32(PROPOSALS));
    await ballotContract.deployed();
    console.log(`the ballot smart contract was deployed at ${ballotContract.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



// describe("Ballot", () => {
//     let ballotContract: Ballot;
//     let accounts: SignerWithAddress[];
//     beforeEach(async ()=> {
//         accounts = await ballotContractFactory.deploy(
//             convertStringArrayToBytes32(PROPOSALS)
//         );
//         await ballotContract.deployed();
//     });

//     describe("when the contract is deployed", () => {
//         it("has the provided proposal", async () => {
//             for (let index = 0; index < PROPOSALS.length; index++) {
//                 const proposal = await ballotContract.proposals(index);
//                 expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(PROPOSALS[index]
//                     );
//                  }
//         });
//         it("sets the deployer address as chairpenson", async () => {
//             const chairpenson = await ballotContract.chairperson();
//             expect(chairpenson).to.eq(accounts[0].address);
//         });
//         it("sets the voting weight for the chairperson as 1", async () => {
//             const chairpensonVoter = await ballotContract.voters(accounts[0].address);
//             expect(chairpensonVoter.weight).to.eq(1);
//         });
//     });
//     describe("when the chairperson interacts with the giveRightVote function in the contract", () => {
//         beforeEach(async () => {
//             const selectedVoter = accounts[1].address;
//             const tx = await ballotContract.giveRightToVote(selectedVoter);
//             await tx.wait();
//         });
//         it("gives right to vote for another address", async () = > {
//             const acc1Voter = await ballotContract.voters(account[1].address);
//             expect(acc1Voter.weight).to.eq(1);
//         });


//     })
// }



// async function main() {
//     console.log("Deploying Ballot contract");
//     console.log("Proposals: ");
//     const proposals = process.argv.slice(2);
//     proposals.forEach((element, index) => {
//       console.log(`Proposal N. ${index + 1}: ${element}`);
//     });
//     const provider = ethers.getDefaultProvider("goerli");
//     const wallet = ethers.Wallet.createRandom();
//     const signer = wallet.connect(provider);
//     const balance = await signer.getBalance();
//     console.log(`This address has a balance of ${balance} wei`);
//     if (balance.eq(0)) throw new Error("I'm too poor");
//     const ballotContractFactory = new Ballot__factory(signer);
//     const ballotContract = await ballotContractFactory.deploy(
//       convertStringArrayToBytes32(proposals)
//     );
//     await ballotContract.deployed();
//     console.log(`The ballot smart contract was deployed at ${ballotContract.address}`)
//   }
  

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


  


//   async function main() {
//     const contractAddress = process.argv[2];
//     const targetAddress = process.argv[3];
//     const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
//     const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
//     const signer = wallet.connect(provider);
//     console.log(`Connected to the wallet ${signer.address}`);
//     const balance = await signer.getBalance();
//     console.log(`This address has a balance of ${balance} wei`);
//     if (balance.eq(0)) throw new Error("I'm too poor");
//     const ballotContractFactory = new Ballot__factory(signer);
//     const ballotContract = ballotContractFactory.attach(
//       contractAddress
//     );
//     const tx = await ballotContract.giveRightToVote(targetAddress);
//     await tx.wait();
//     console.log("Done!");
//     console.log(tx.hash);
//   }
  