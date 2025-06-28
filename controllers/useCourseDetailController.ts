import useCourseDetails from "@/features/courses/useCourseDetails";
import useEnrollCourse from "@/features/courses/useEnrollCourse";
import { CourseDetailSearchParam } from "./types";

const useCourseDetailController = (props: CourseDetailSearchParam) => {
  const { isLoading, data, error } = useCourseDetails(props.slug);

  const { isEnrolled, onEnrollCourse } = useEnrollCourse(data);

  return {
    isLoading,
    data,
    error,
    isEnrolled,
    onEnrollCourse,
  };
};

export default useCourseDetailController;
