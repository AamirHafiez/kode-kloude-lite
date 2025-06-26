import { ApiAdapterInstance } from "../adapters/types";
import CoursesModel from "../models/CoursesModel";

const CoursesRepository = (apiAdapter: ApiAdapterInstance) => ({
  getCourses: async (page: number) => {
    const coursesRes = await apiAdapter.get<CoursesModel>(
      `/courses?page=${page}`,
    );
    return coursesRes.data;
  },
});

export default CoursesRepository;
