import { create } from "ipfs-http-client";
import { Keyring } from "@polkadot/api";
import { waitReady } from "@polkadot/wasm-crypto";
//import axios from "axios";

const ipfsGateway = "https://crustwebsites.net";
//const ipfsPinningService = "https://pin.crustcode.com/psa";

export const FileServices = {
  addFile: async (fileContent, seed) => {
    await waitReady();
    const keyring = new Keyring({ type: "sr25519" });
    const pair = keyring.addFromUri(seed);
    const sig = pair.sign(pair.address);
    const sigHex = "0x" + Buffer.from(sig).toString("hex");
    const authHeader = Buffer.from(`sub-${pair.address}:${sigHex}`).toString("base64");
    const ipfs = await create({
      url: ipfsGateway + "/api/v0",
      headers: {
        authorization: "Basic " + authHeader,
      },
    });
    const { cid } = await ipfs.add(fileContent);
    return cid.toV0().toString();
    //if (cid) {
    //console.log(cid.toV0().toString());
    // const { body } = await axios.post(ipfsPinningService + "/pins", {
    //   headers: {
    //     authorization: "Bearer " + authHeader,
    //   },
    //   json: {
    //     cid: "QmdTsUnXZzM1szvnEkYSKjkVL2xZ5GqmKJ6BPwE6ZKcvxv",
    //   },
    // });
    // console.log(body);
    //} else {
    //  throw new Error("IPFS add failed, please try again.");
    //}
  },
};
