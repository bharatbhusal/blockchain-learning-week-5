const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("VotingSystem Contract", function () {
    // Fixture to set up a common deployment state for every test
    async function deployVotingSystemFixture() {
        // Deploy VotingSystem contract
        const votingSystem = await hre.ethers.deployContract("VotingSystem", [["Bharat", "Geeta", "Neeta", "Pabitra"]], {});
        await votingSystem.waitForDeployment();

        // Obtain signer accounts and nullAddress
        const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();

        // Return relevant objects for use in tests
        return { votingSystem, owner, otherAccount1, otherAccount2 };
    }

    // Test suite for contract deployment
    describe("Deployment", function () {
        it("should deploy the VotingSystem contract with initial candidates", async function () {
            // Load the deployment fixture and ensure it runs successfully
            const { votingSystem } = await loadFixture(deployVotingSystemFixture);
            expect(await (await votingSystem.getCandidates())[0]).to.equal("Bharat");
        });
    });

    // Test suite for removeCandidate function
    describe("removeCandidate Functionality", function () {
        it("owner can remove a candidate from the list", async function () {
            const { votingSystem, owner } = await loadFixture(deployVotingSystemFixture);
            await votingSystem.connect(owner).removeCandidate(0);
            expect(await (await votingSystem.getCandidates())[0]).to.equal("");
        });

        it("non-owner cannot remove a candidate from the list", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await expect(votingSystem.connect(otherAccount1).removeCandidate(0)).to.be.revertedWith("Not Owner");
        });

        it("owner cannot remove an invalid candidate index", async function () {
            const { votingSystem, owner } = await loadFixture(deployVotingSystemFixture);
            await expect(votingSystem.connect(owner).removeCandidate(10)).to.be.revertedWith("Invalid Candidate Index");
        });
    });

    // Test suite for addCandidate function
    describe("addCandidate Functionality", function () {
        it("owner can add a new candidate to the list", async function () {
            const { votingSystem, owner } = await loadFixture(deployVotingSystemFixture);
            await votingSystem.connect(owner).addCandidate("Raju");
            expect(await (await votingSystem.getCandidates())[4]).to.equal("Raju");
        });

        it("non-owner cannot add a new candidate to the list", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await expect(votingSystem.connect(otherAccount1).addCandidate("Raju")).to.be.revertedWith("Not Owner");
        });
    });

    // Test suite for vote function
    describe("vote Functionality", function () {
        it("anyone can cast a vote for a valid candidate", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await votingSystem.connect(otherAccount1).vote(0);
            expect(await votingSystem.getTotalVotes(0)).to.equal(1);
        });

        it("anyone cannot cast a vote twice", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await votingSystem.connect(otherAccount1).vote(1);
            await expect(votingSystem.connect(otherAccount1).vote(0)).to.be.revertedWith("Already voted");
        });

        it("anyone cannot cast a vote for an invalid candidate index", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await expect(votingSystem.connect(otherAccount1).vote(10)).to.be.revertedWith("Invalid Candidate Index");
        });
    });

    // Test suite for getCandidates function
    describe("getCandidates Functionality", function () {
        it("should return the list of all candidates", async function () {
            const { votingSystem } = await loadFixture(deployVotingSystemFixture);
            const candidates = await votingSystem.getCandidates();
            expect(candidates).to.deep.equal(["Bharat", "Geeta", "Neeta", "Pabitra"]);
        });
    });

    // Test suite for hasVoted function
    describe("hasVoted Functionality", function () {
        it("should return false for a voter who hasn't voted", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            const hasVoted = await votingSystem.hasVoted(otherAccount1.address);
            expect(hasVoted).to.be.false;
        });

        it("should return true for a voter who has voted", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await votingSystem.connect(otherAccount1).vote(0);
            const hasVoted = await votingSystem.hasVoted(otherAccount1.address);
            expect(hasVoted).to.be.true;
        });
    });

    // Test suite for getTotalVotes function
    describe("getTotalVotes Functionality", function () {
        it("should return the total votes for a candidate", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await votingSystem.connect(otherAccount1).vote(0);
            const totalVotes = await votingSystem.getTotalVotes(0);
            expect(totalVotes).to.equal(1);
        });
    });
});
