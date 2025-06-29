import { Course } from "@/data/models/CoursesModel";
import { useAppLocalStorage } from "@/store/local-storage/appLocalStorage";

const useEnrollCourse = (course?: Course) => {
  const [enrolledCourses, setEnrolledCourse] =
    useAppLocalStorage("ENROLLED_COURSES");

  const onEnrollCourse = () => {
    if (course == null) {
      return "COULD_NOT_ENROLL";
    }
    if (isEnrolled()) {
      return "ALREADY_ENROLLED";
    }
    if (enrolledCourses == null || enrolledCourses.length <= 0) {
      setEnrolledCourse([course.id]);
    } else {
      const prevEnrolled = new Set(enrolledCourses);
      prevEnrolled.add(course.id);
      setEnrolledCourse(Array.from(prevEnrolled));
    }
    return "ENROLLED";
  };

  const isEnrolled = () => {
    if (course == null) {
      return false;
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
