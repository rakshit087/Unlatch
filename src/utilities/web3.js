import { ethers } from "ethers";

export const Web3Service = {
  connect: async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  },
};
