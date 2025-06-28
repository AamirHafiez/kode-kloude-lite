import { ApiAdapterInstance } from "../adapters/types";
import CourseCompletionModel from "../models/CourseCompletionModel";
import { CourseDetail } from "../models/CourseDetailsModel";
import CoursesModel, { Course } from "../models/CoursesModel";

const CoursesRepository = (apiAdapter: ApiAdapterInstance) => ({
  getCourses: (page: number) =>
    apiAdapter
      .get<CoursesModel>(`/courses?page=${page}`)
      .then((res) => res.data),
  getCourseDetails: (slug: Course["slug"]) =>
    apiAdapter.get<CourseDetail>(`/courses/${slug}`).then((res) => res.data),
  getCourseCompletion: (slug: Course["slug"]) =>
    apiAdapter
      .get<CourseCompletionModel>(`/course-completion/${slug}`)
      .then((res) => res.data),
});

export default CoursesRepository;
