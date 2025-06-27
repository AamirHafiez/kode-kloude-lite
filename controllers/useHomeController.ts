import useCourses from "@/features/courses/useCourses";
import useOnlineStatus from "@/utils/hooks/useOnlineStatus";
import { useRouter } from "expo-router";
import { useMemo, useRef } from "react";

const useHomeController = () => {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useCourses(1);

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
    return data?.pages == null
      ? []
      : data.pages
          .flat()
          .map((item) => item?.courses.flat())
          .filter((item) => item != null)
          .flat();
  }, [data?.pages]);

  const handlePressNavigateDownloads = () => {
    router.replace("/downloads");
  };

  return {
    coursesData,
    onlineStatus,
    shouldRenderSpinner: isFetchingNextPage && hasNextPage,
    isLoading,
    error,
    onListMomentumScrollEnd,
    onListEndReached,
    handlePressNavigateDownloads,
  };
};

export default useHomeController;
