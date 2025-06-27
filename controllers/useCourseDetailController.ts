import useCourseDetails from "@/features/courses/useCourseDetails";
import { CourseDetailSearchParam } from "./types";

const useCourseDetailController = (props: CourseDetailSearchParam) => {
  const { isLoading, data, error } = useCourseDetails(props.slug);

  return {
    isLoading,
    data,
    error,
  };
};

export default useCourseDetailController;
