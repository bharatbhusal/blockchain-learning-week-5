const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

// Define a test suite for the VotingSystem contract
describe("VotingSystem", function () {
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
    describe("Test Deployment", function () {
        it("Should deploy correctly", async function () {
            // Load the deployment fixture and ensure it runs successfully
            const { votingSystem } = await loadFixture(deployVotingSystemFixture);
            expect(await (await votingSystem.getCandidates())[0]).to.equal("Bharat");
        });
    });

    describe("Test removeCandidate", function () {
        it("Owner can remove candidate", async function () {
            const { votingSystem, owner } = await loadFixture(deployVotingSystemFixture);
            await votingSystem.connect(owner).removeCandidate(0);
            expect(await (await votingSystem.getCandidates())[0]).to.equal("");
        })
        it("Non-Owner can't remove candidate", async function () {
            const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);
            await expect(votingSystem.connect(otherAccount1).removeCandidate(0)).to.be.revertedWith("Not Owner");
        })
    })

    // // Test suite for assignSellerRole function
    // describe("Test assignSellerRole", function () {
    //     it("Owner can assign Seller role to user", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1 } = await loadFixture(deployVotingSystemFixture);

    //         // Ensure initial Seller role status is false
    //         expect(await votingSystem.SELLER(otherAccount1)).to.equal(false);

    //         // Owner assigns Seller role to otherAccount1
    //         expect(await votingSystem.connect(owner).assignSellerRole(otherAccount1));

    //         // Ensure Seller role status is now true for otherAccount1
    //         expect(await votingSystem.SELLER(otherAccount1)).to.equal(true);
    //     });

    //     it("Non-owner can't assign Seller role to user", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, otherAccount1, otherAccount2 } = await loadFixture(deployVotingSystemFixture);

    //         // Expect non-owner to be reverted when trying to assign Seller role
    //         await expect(votingSystem.connect(otherAccount1).assignSellerRole(otherAccount2)).to.be.revertedWith("Not Administrator");
    //     });

    //     it("Owner can't assign Seller role to invalid user", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, nullAddress } = await loadFixture(deployVotingSystemFixture);

    //         // Expect owner to be reverted when trying to assign Seller role to an invalid address
    //         await expect(votingSystem.connect(owner).assignSellerRole(nullAddress)).to.be.revertedWith("Invalid address");
    //     });
    // });

    // // Test suite for createProduct function
    // describe("Test createProduct", function () {
    //     it("Seller can create a new Product correctly", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller role to otherAccount1
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);

    //         // Ensure product creation is successful
    //         expect(await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n));

    //         // Retrieve product details and check ownership
    //         const product = await votingSystem.STORAGE(1);
    //         const isOwner = await votingSystem.OWNER(1, otherAccount1);

    //         // Validate product details and ownership
    //         expect(product.productId).to.equal(1);
    //         expect(isOwner).to.equal(true);
    //     });

    //     it("Non-seller can't create a new Product", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, otherAccount1 } = await loadFixture(deployVotingSystemFixture);

    //         // Expect non-seller to be reverted when trying to create a product
    //         await expect(votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n)).to.be.revertedWith("Not a Seller");
    //     });

    //     it("Seller can't create a duplicate Product", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller role to otherAccount1
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);

    //         // Create a product with productId 1
    //         await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n);

    //         // Expect seller to be reverted when trying to create a duplicate product with the same productId
    //         await expect(votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n)).to.be.revertedWith("Product already exists");
    //     });
    // });

    // // Test suite for sellProduct function
    // describe("Test sellProduct", function () {
    //     it("Seller can sell product correctly", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1, otherAccount2 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller roles to otherAccount1 and otherAccount2
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount2);

    //         // Create a product with productId 1 by otherAccount1
    //         await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n);

    //         // Seller (otherAccount1) sells the product to otherAccount2
    //         expect(await votingSystem.connect(otherAccount1).sellProduct(1, otherAccount2, 500));

    //         // Check ownership after the sale
    //         const isOwner = await votingSystem.OWNER(1, otherAccount2);
    //         expect(isOwner).to.equal(true);
    //     });

    //     it("Seller can't sell product to non-seller", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1, otherAccount2 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller role to otherAccount1
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);

    //         // Create a product with productId 1 by otherAccount1
    //         await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n);

    //         // Expect seller (otherAccount1) to be reverted when trying to sell the product to a non-seller (otherAccount2)
    //         await expect(votingSystem.connect(otherAccount1).sellProduct(1, otherAccount2, 500)).to.be.revertedWith("Not a Seller");
    //     });

    //     it("Seller can't sell not existing product", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1, otherAccount2 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller roles to otherAccount1 and otherAccount2
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount2);

    //         // Create a product with productId 1 by otherAccount1
    //         await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n);

    //         // Expect seller (otherAccount1) to be reverted when trying to sell a non-existing product (productId 2) to otherAccount2
    //         await expect(votingSystem.connect(otherAccount1).sellProduct(2, otherAccount2, 500)).to.be.revertedWith("Product does not exist");
    //     })

    //     it("Seller can sell only their owned product", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1, otherAccount2 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller roles to otherAccount1 and otherAccount2
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount2);

    //         // Create products with productId 1 by otherAccount1 and productId 2 by otherAccount2
    //         await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n);
    //         await votingSystem.connect(otherAccount2).createProduct(2, "Twited Love", 999n);

    //         // Expect seller (otherAccount1) to be reverted when trying to sell the product (productId 2) owned by otherAccount2
    //         await expect(votingSystem.connect(otherAccount1).sellProduct(2, otherAccount2, 999)).to.be.revertedWith("Not Owner");
    //     })
    // });

    // // Test suite for getProductDetail function
    // describe("Test getProductDetail", function () {
    //     it("User can get product correctly", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller role to otherAccount1
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);

    //         // Create a product with productId 1 by otherAccount1
    //         expect(await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n));

    //         // User (otherAccount1) retrieves product details for productId 1
    //         await votingSystem.connect(otherAccount1).getProductDetail(1);
    //     })

    //     it("User can't get not existing product", async function () {
    //         // Load the deployment fixture and obtain relevant objects
    //         const { votingSystem, owner, otherAccount1 } = await loadFixture(deployVotingSystemFixture);

    //         // Assign Seller role to otherAccount1
    //         await votingSystem.connect(owner).assignSellerRole(otherAccount1);

    //         // Create a product with productId 1 by otherAccount1
    //         expect(await votingSystem.connect(otherAccount1).createProduct(1, "KoW", 499n));

    //         // User (otherAccount1) attempts to retrieve details for a non-existing product (productId 2)
    //         await expect(votingSystem.connect(otherAccount1).getProductDetail(2)).to.be.revertedWith("Product does not exist");
    //     })
    // });
});
