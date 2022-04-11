import { ethers } from "ethers";

let window;

export const Web3Service = {
  connect: async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  },
};
