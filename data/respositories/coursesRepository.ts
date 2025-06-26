import { ApiAdapterInstance } from "../adapters/types";
import CoursesModel from "../models/CoursesModel";

const CoursesRepository = (apiAdapter: ApiAdapterInstance) => ({
  getCourses: async (page: number) => {
    return await apiAdapter.get<CoursesModel>(`/courses?page=${page}`);
  },
});

export default CoursesRepository;
