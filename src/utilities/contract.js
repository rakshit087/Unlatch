import { ethers } from "ethers";
import UnlatchArtifact from "../../artifacts/src/contracts/Unlatch.sol/Unlatch.json";
const contractAddress = "0xd5a95ec79689bd9b3ab05c2633d68da6727d892c";

export const ContractService = {
  postCourse: async (title, description, videos) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, UnlatchArtifact.abi, signer);
    const tx = await contract.createCourse(title, description, videos);
    const receipt = await tx.wait();
    return receipt;
    console.log(videos);
  },
  getCourses: async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, UnlatchArtifact.abi, signer);
    const courses = await contract.getLatestCourses();
    return courses;
  },
};
