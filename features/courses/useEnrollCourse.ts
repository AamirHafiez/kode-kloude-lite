import { Course } from "@/data/models/CoursesModel";
import { useAppLocalStorage } from "@/store/local-storage/appLocalStorage";

const useEnrollCourse = (course?: Course) => {
  const [enrolledCourses, setEnrolledCourse] =
    useAppLocalStorage("ENROLLED_COURSES");

  const onEnrollCourse = () => {
    if (course == null) {
      throw new Error("Course not provided.");
    }
    if (isEnrolled()) {
      return;
    }
    if (enrolledCourses == null || enrolledCourses.length <= 0) {
      setEnrolledCourse([course.id]);
    } else {
      const prevEnrolled = new Set(enrolledCourses);
      prevEnrolled.add(course.id);
      setEnrolledCourse(Array.from(prevEnrolled));
    }
  };

  const isEnrolled = () => {
    if (course == null) {
      throw new Error("Course not provided.");
    }
    const enrolledCourseSet = new Set(enrolledCourses);
    if (enrolledCourseSet.has(course.id)) return true;
    return false;
  };

  return {
    onEnrollCourse,
    isEnrolled,
  };
};

export default useEnrollCourse;
