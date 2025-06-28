import { Course } from "@/data/models/CoursesModel";
import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import coursesNetworkAdapter from "./coursesNetworkAdapter";
import coursesQueryKeys from "./coursesQueryKeys";

const useCourseDetails = (courseSlug: Course["slug"]) => {
  const courseDetailQuery = useQuery({
    queryKey: coursesQueryKeys.detail(courseSlug),
    queryFn: () => coursesNetworkAdapter.getCourseDetails(courseSlug),
    staleTime: Infinity,
  });

  const courseCompletion = useQuery({
    queryKey: coursesQueryKeys.completion(courseSlug),
    queryFn: () => coursesNetworkAdapter.getCourseCompletion(courseSlug),
    refetchOnWindowFocus: "always",
    staleTime: 0,
  });

  useEffect(() => {
    if (courseDetailQuery.data != null) {
      AppLocalStorage.set("LAST_VIEW_COURSE", courseDetailQuery.data);
    }
  }, [courseDetailQuery.data]);

  return {
    ...courseDetailQuery,
    courseCompletion,
  };
};

export default useCourseDetails;
