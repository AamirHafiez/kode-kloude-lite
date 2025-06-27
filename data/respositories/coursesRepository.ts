import { ApiAdapterInstance } from "../adapters/types";
import { CourseDetail } from "../models/CourseDetailsModel";
import CoursesModel from "../models/CoursesModel";

const CoursesRepository = (apiAdapter: ApiAdapterInstance) => ({
  getCourses: (page: number) =>
    apiAdapter
      .get<CoursesModel>(`/courses?page=${page}`)
      .then((res) => res.data),
  getCourseDetails: (slug: string) =>
    apiAdapter.get<CourseDetail>(`/courses/${slug}`).then((res) => res.data),
});

export default CoursesRepository;
