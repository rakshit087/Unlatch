import { ethers } from "ethers";
import UnlatchArtifact from "../../artifacts/src/contracts/Unlatch.sol/Unlatch.json";
const contractAddress = "0xe4cddf2434754d8cb0ab1bce4b759370ce251abd";

export const ContractService = {
  postCourse: async (title, description, videos) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, UnlatchArtifact.abi, signer);
    const tx = await contract.createCourse(title, description, videos);
    const receipt = await tx.wait();
    return receipt;
  },
  getCourses: async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, UnlatchArtifact.abi, signer);
    const courses = await contract.getLatestCourses();
    return courses;
  },
  getVideos: async (courseId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, UnlatchArtifact.abi, signer);
    const videos = await contract.getVideos(courseId);
    return videos;
  },
};
