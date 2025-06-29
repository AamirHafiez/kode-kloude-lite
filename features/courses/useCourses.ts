import CoursesModel from "@/data/models/CoursesModel";
import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import useOnlineStatus from "@/utils/hooks/useOnlineStatus";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import coursesNetworkAdapter from "./coursesNetworkAdapter";
import coursesQueryKeys from "./coursesQueryKeys";

const cacheCourseResponse = (data?: InfiniteData<CoursesModel, unknown>) => {
  if (data != null) AppLocalStorage.set("OFFLINE_COURSES", data);
  // const courses = data?.courses;
  // const metadata = data?.metadata;

  // console.log("cacheCourseResponse");
  // courses?.forEach((course) => {
  //   console.log(course.title);
  // });
  // console.log();

  // const { courses: prevStoredCourses } = AppLocalStorage.get("COURSES") ?? {};
  // if (metadata != null && courses != null) {
  //   const offlineCourses: CoursesModel = {
  //     courses:
  //       prevStoredCourses != null
  //         ? Array.from(new Set([...prevStoredCourses, ...courses]))
  //         : [...courses],
  //     metadata,
  //   };
  //   AppLocalStorage.set("COURSES", offlineCourses);
  // }
};

const getCoursesData = async (page: number) => {
  const res = await coursesNetworkAdapter.getCourses(page);
  // cacheCourseResponse(res);
  return res;
};

const useInfiniteCoursesQuery = (initialPage: number) => {
  const networkState = useOnlineStatus();

  const coursesQuery = useInfiniteQuery({
    queryKey: coursesQueryKeys.page(networkState.isConnected!),
    queryFn: ({ pageParam }) => getCoursesData(pageParam),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage) => lastPage?.metadata?.next_page,
    enabled: networkState.isConnected != null,
    staleTime: Infinity,
  });

  const onFetchNextPageMore = () => {
    if (networkState?.isConnected != null && networkState.isConnected) {
      coursesQuery.fetchNextPage();
    }
  };

  useEffect(() => {
    cacheCourseResponse(coursesQuery.data);
  }, [coursesQuery?.data?.pages.length]);

  return {
    ...coursesQuery,
    fetchNextPage: onFetchNextPageMore,
  };
};

export default useInfiniteCoursesQuery;
