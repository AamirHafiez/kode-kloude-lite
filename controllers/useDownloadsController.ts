import { Course } from "@/data/models/CoursesModel";
import { useRouter } from "expo-router";
import { useCallback } from "react";

const useDownloadsController = () => {
  const router = useRouter();

  const handlePressCourseCard = useCallback(
    (course: Course) => {
      router.navigate(`/course-detail/${course.slug}`);
    },
    [router],
  );

  return { handlePressCourseCard };
};

export default useDownloadsController;
