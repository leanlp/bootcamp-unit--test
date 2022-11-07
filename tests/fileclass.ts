import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Chocolate", "Vanilla", "Lemon", "Cookie"];

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

describe("Ballot", async () => {
    let ballotContract: Ballot;
    let accounts: SignerWithAddress[];
    beforeEach(async ()=> {
        const ballotContractFactory = await ethers.getContractFactory("Ballot");
         const accounts = await ballotContractFactory.deploy(convertStringArrayToBytes32(PROPOSALS));
    });
        await ballotContract.deployed();
//modifique accounts, add const
    describe("when the contract is deployed", () => {
        it("has the provided proposal", async () => {
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.proposals(index);
                expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(PROPOSALS[index]
                    );
                 }
        });
        it("sets the deployer address as chairpenson", async () => {
            const chairpenson = await ballotContract.chairperson();
            expect(chairpenson).to.eq(accounts[0].address);
        });
        it("sets the voting weight for the chairperson as 1", async () => {
            const chairpensonVoter = await ballotContract.voters(accounts[0].address);
            expect(chairpensonVoter.weight).to.eq(1);
        });
    });
    describe("when the chairperson interacts with the giveRightVote function in the contract", () => {
        beforeEach(async () => {
            const selectedVoter = accounts[1].address;
            const tx = await ballotContract.giveRightToVote(selectedVoter);
            await tx.wait();
        });
        it("gives right to vote for another address", async () => {
            const acc1Voter = await ballotContract.voters(accounts[1].address)
            expect(acc1Voter.weight).to.eq(1);
        });
        it("can not give right to vote for someone that has voted", async () => {
        const voteTx = await ballotContract.connect(accounts[1]).vote(0);
        await voteTx.wait();
        await expect(
            ballotContract.giveRightToVote(accounts[1].address)).to.be.revertedWith("the voter alredy voted.");
   });
//    it("can not give right to vote for someone that has alredy voting rights", async () => {
//     await expect(
//         ballotContract.giveRightToVote(selectedVoter)).to.be.revertedWithoutReason();
//     });
   });
});
