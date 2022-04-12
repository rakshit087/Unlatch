import { create, globSource } from "ipfs-http-client";
import { ethers } from "ethers";
import axios from "axios";
const ipfsPinningService = "https://pin.crustcode.com/psa";

export const FileServices = {
  addFile: async (fileContent) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicAddress = await signer.getAddress();
    const privateKey = await signer.signMessage(publicAddress);
    const authHeaderRaw = `eth-${publicAddress}:${privateKey}`;
    const authHeader = Buffer.from(authHeaderRaw).toString("base64");
    const ipfsW3GW = "https://crustipfs.xyz";

    // 1. Create IPFS instant
    const ipfs = create({
      url: `${ipfsW3GW}/api/v0`,
      headers: {
        authorization: `Basic ${authHeader}`,
      },
    });
    const { cid } = await ipfs.add(fileContent);
    return cid;
    // console.log(cid);
    // const res = await axios.post(`${ipfsPinningService}/pins`, {
    //   headers: {
    //     'Authorization': `Basic ${authHeader}`,
    //   },
    //   json: {
    //     cid: cid.toV0().toString(),
    //     name: "test",
    //   }
    // })
    // console.log(res);
    // return res.pin.cid;
  },
};
