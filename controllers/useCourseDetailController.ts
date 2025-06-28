import useCourseDetails from "@/features/courses/useCourseDetails";
import useEnrollCourse from "@/features/courses/useEnrollCourse";
import { scheduleNotification } from "@/utils/notifications/notificationUtilitis";
import { useRouter } from "expo-router";
import { CourseDetailSearchParam } from "./types";

const useCourseDetailController = (props: CourseDetailSearchParam) => {
  const { isLoading, data, error } = useCourseDetails(props.slug);

  const { isEnrolled, onEnrollCourse } = useEnrollCourse(data);

  const router = useRouter();

  const onPressEnrollCourse = () => {
    const enrollStatus = onEnrollCourse();
    if (enrollStatus === "ENROLLED") {
      scheduleNotification({
        title: "Hey Start your learning today.",
        body: "Start learning, " + data?.title,
        time: 10, // 10 seconds
      });
    }
  };

  const onStartLearning = () => {
    router.navigate(`/course-modules/${props.slug}`);
  };

  return {
    isLoading,
    data,
    error,
    isEnrolled,
    onEnrollCourse: onPressEnrollCourse,
    onStartLearning,
  };
};

export default useCourseDetailController;
