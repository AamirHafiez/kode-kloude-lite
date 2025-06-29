import { Course } from "@/data/models/CoursesModel";
import useCourses from "@/features/courses/useCourses";
import AppLocalStorage, {
  useAppLocalStorage,
} from "@/store/local-storage/appLocalStorage";
import useOnlineStatus from "@/utils/hooks/useOnlineStatus";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";

const useHomeController = () => {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useCourses(1);

  const [lastViewedCourse] = useAppLocalStorage("LAST_VIEW_COURSE");

  const onlineStatus = useOnlineStatus();

  const router = useRouter();

  const onEndReachedCourseListRef = useRef(false);

  const fetchMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onListEndReached = () => {
    onEndReachedCourseListRef.current = true;
  };

  const onListMomentumScrollEnd = () => {
    onEndReachedCourseListRef.current && fetchMore();
    onEndReachedCourseListRef.current = false;
  };

  const coursesData = useMemo(() => {
    const dataForCourses =
      onlineStatus != null && !onlineStatus.isConnected
        ? AppLocalStorage.get("OFFLINE_COURSES")
        : data;

    return dataForCourses?.pages == null
      ? []
      : dataForCourses.pages
          .flat()
          .map((item) => item?.courses.flat())
          .filter((item) => item != null)
          .flat();
  }, [data?.pages, onlineStatus.isConnected]);

  const handlePressCourseCard = useCallback(
    (course: Course) => {
      router.navigate(`/course-detail/${course.slug}`);
    },
    [router],
  );

  return {
    coursesData,
    onlineStatus,
    shouldRenderSpinner: isFetchingNextPage && hasNextPage,
    isLoading,
    error,
    onListMomentumScrollEnd,
    onListEndReached,
    handlePressCourseCard,
    lastViewedCourse,
  };
};

export default useHomeController;
