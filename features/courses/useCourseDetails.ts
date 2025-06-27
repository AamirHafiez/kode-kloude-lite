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

  useEffect(() => {
    if (courseDetailQuery.data != null) {
      AppLocalStorage.set("LAST_VIEW_COURSE", courseDetailQuery.data);
    }
  }, [courseDetailQuery.data]);

  return {
    ...courseDetailQuery,
  };
};

export default useCourseDetails;
