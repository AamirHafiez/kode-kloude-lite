import { networkApiAdapter } from "@/data/adapters";
import CoursesRepository from "@/data/respositories/coursesRepository";

const coursesNetworkAdapter = CoursesRepository(networkApiAdapter);

export default coursesNetworkAdapter;
