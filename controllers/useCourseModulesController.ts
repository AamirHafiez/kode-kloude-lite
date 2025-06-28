import useCourseDetails from "@/features/courses/useCourseDetails";
import { CourseModulesSearchParam } from "./types";

const useCourseModulesController = (props: CourseModulesSearchParam) => {
  const { isLoading, data, error } = useCourseDetails(props.slug);

  return {
    isLoading,
    data,
    error,
  };
};

export default useCourseModulesController;
