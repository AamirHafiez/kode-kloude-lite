import { Course } from "./CoursesModel";

export type LessonType = "video" | "article" | "lab";

export type Lesson = {
  id: string;
  title: string;
  type: LessonType;
  position: number;
  duration?: number;
  open_access: boolean;
};

export type Module = {
  id: string;
  title: string;
  position: number;
  lessons_count: number;
  lessons: Lesson[];
};

export type IncludesSection = {
  modules_count: number;
  lessons_count: number;
  lab_lessons: boolean;
  lab_lesson_count: number;
  quiz_lessons: boolean;
  quiz_lesson_count: number;
  mock_exams: boolean;
  hours_of_video: number;
  course_duration: number;
};

export type CourseDetail = Course & {
  excerpt: string;
  description: string;
  lessons_count: number;
  userback_id: string;
  hidden: boolean;
  modules: Module[];
  includes_section: IncludesSection;
};
