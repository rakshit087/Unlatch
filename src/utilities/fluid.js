import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export const FluidService = {
  createStream: (recipent) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider
    });
    await sf.initialize();
    //get public address provider
    const carol = sf.user({
        address: signer.getAddress(),
        token: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'
      });
      await carol.flow({
        recipient: recipent,
        flowRate: 385802469135802
      });
      
      const details = await carol.details();
      console.log(details);
  },
};
