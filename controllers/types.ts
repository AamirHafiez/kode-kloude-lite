import { Lesson } from "@/data/models/CourseDetailsModel";
import { Course } from "@/data/models/CoursesModel";

export type CourseDetailSearchParam = { slug: Course["slug"] };
export type CourseModulesSearchParam = { slug: Course["slug"] };
export type LessonSearchParam = { "lesson-id": Lesson["id"] };
