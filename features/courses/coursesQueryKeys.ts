import { Course } from "@/data/models/CoursesModel";

const coursesQueryKeys = Object.freeze({
  all: [{ scope: "courses" }] as const,
  page: (onlineState: boolean) =>
    [{ ...coursesQueryKeys.all[0], onlineState }] as const,
  detail: (slug: Course["slug"]) =>
    [{ ...coursesQueryKeys.all[0], type: "course-detail", slug }] as const,
});

export default coursesQueryKeys;
