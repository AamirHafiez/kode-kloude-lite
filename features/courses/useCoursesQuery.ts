import { networkApiAdapter } from "@/data/adapters";
import CoursesRepository from "@/data/respositories/coursesRepository";
import { useInfiniteQuery } from "@tanstack/react-query";
import coursesQueryKeys from "./coursesQueryKeys";

const courses = CoursesRepository(networkApiAdapter);

export const useInfiniteCoursesQuery = (initialPage: number) =>
  useInfiniteQuery({
    queryKey: coursesQueryKeys.page(),
    queryFn: ({ pageParam }) => courses.getCourses(pageParam),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage) => lastPage.metadata.next_page,
  });
