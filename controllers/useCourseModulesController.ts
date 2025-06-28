import { Lesson } from "@/data/models/CourseDetailsModel";
import useCourseDetails from "@/features/courses/useCourseDetails";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { CourseModulesSearchParam } from "./types";

const useCourseModulesController = (props: CourseModulesSearchParam) => {
  const { isLoading, data, error, courseCompletion } = useCourseDetails(
    props.slug,
  );

  const router = useRouter();

  const handlePressLesson = useCallback(
    (lessonId: Lesson["id"]) => {
      router.navigate(`/lesson/${lessonId}`);
    },
    [router],
  );

  return {
    isLoading,
    data,
    error,
    handlePressLesson,
    courseCompleted: courseCompletion.data?.completed,
  };
};

export default useCourseModulesController;
