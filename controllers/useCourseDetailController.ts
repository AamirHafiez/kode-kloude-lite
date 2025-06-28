import useCourseDetails from "@/features/courses/useCourseDetails";
import useEnrollCourse from "@/features/courses/useEnrollCourse";
import { scheduleNotification } from "@/utils/notifications/notificationUtilitis";
import { CourseDetailSearchParam } from "./types";

const useCourseDetailController = (props: CourseDetailSearchParam) => {
  const { isLoading, data, error } = useCourseDetails(props.slug);

  const { isEnrolled, onEnrollCourse } = useEnrollCourse(data);

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

  return {
    isLoading,
    data,
    error,
    isEnrolled,
    onEnrollCourse: onPressEnrollCourse,
  };
};

export default useCourseDetailController;
