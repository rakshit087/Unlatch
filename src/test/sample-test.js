const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Unlatch Contract", () => {
  let UnlatchContract, deployedUnlatchContract, owner, addr1, addr2;
  beforeEach(async () => {
    UnlatchContract = await ethers.getContractFactory("Unlatch");
    deployedUnlatchContract = await UnlatchContract.deploy();
    [owner, addr1, addr2, _] = await ethers.getSigners();
  });
  describe("Deployment", () => {
    it("Should be the right Owner", async () => {
      expect(deployedUnlatchContract.deployTransaction.from).is.equal(owner.address);
    });
  });
  describe("Posting Course", () => {
    it("Course is posted", async () => {
      let res = await deployedUnlatchContract.createCourse("My first Course", "This is my Course", [
        {
          name: "My first Course",
          cid: "1",
        },
        {
          name: "My second Course",
          cid: "2",
        },
      ]);
      await res.wait();
      let count = await deployedUnlatchContract.courseCount();
      expect(count).is.equal(1);
      let video_count = await deployedUnlatchContract.videoCount();
      expect(video_count).is.equal(2);
    });
  });
});
