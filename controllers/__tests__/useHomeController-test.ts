import useCourses from "@/features/courses/useCourses";
import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import useOnlineStatus from "@/utils/hooks/useOnlineStatus";
import { act, renderHook } from "@testing-library/react-hooks";
import { mockNavigate } from "../../jest-setup";
import useHomeController from "../useHomeController";

jest.mock("@/features/courses/useCourses");

describe("useHomeController", () => {
  const sampleCourse = {
    id: "course-id",
    slug: "sample-course",
    title: "Sample Course",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useOnlineStatus as jest.Mock).mockReturnValue({ isConnected: true });

    (useCourses as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        pages: [
          [
            {
              courses: [sampleCourse],
            },
          ],
        ],
        pageParams: [],
      },
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });
  });

  it("returns courses data from network when online", () => {
    const { result } = renderHook(() => useHomeController());
    expect(result.current.coursesData).toEqual([sampleCourse]);
    expect(AppLocalStorage.get).not.toHaveBeenCalled();
  });

  it("checks correct key used to get courses when offline", () => {
    (useOnlineStatus as jest.Mock).mockReturnValue({ isConnected: false });
    renderHook(() => useHomeController());
    expect(AppLocalStorage.get).toHaveBeenCalledWith("OFFLINE_COURSES");
  });

  it("fetchMore triggers fetchNextPage if hasNextPage is true", () => {
    const fetchNextPageMock = jest.fn();
    (useCourses as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: null,
      isFetchingNextPage: false,
      fetchNextPage: fetchNextPageMock,
      hasNextPage: true,
    });

    const { result } = renderHook(() => useHomeController());

    act(() => {
      result.current.onListEndReached();
      result.current.onListMomentumScrollEnd();
    });

    expect(fetchNextPageMock).toHaveBeenCalled();
  });

  it("does not call fetchNextPage when hasNextPage is false", () => {
    const fetchNextPageMock = jest.fn();
    (useCourses as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: null,
      isFetchingNextPage: false,
      fetchNextPage: fetchNextPageMock,
      hasNextPage: false,
    });

    const { result } = renderHook(() => useHomeController());

    act(() => {
      result.current.onListEndReached();
      result.current.onListMomentumScrollEnd();
    });

    expect(fetchNextPageMock).not.toHaveBeenCalled();
  });

  it("handlePressCourseCard navigates to course detail", () => {
    const { result } = renderHook(() => useHomeController());

    act(() => {
      result.current.handlePressCourseCard(sampleCourse as any);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      `/course-detail/${sampleCourse.slug}`,
    );
  });

  it("provides the correct loading and fetching states", () => {
    const { result, rerender } = renderHook(() => useHomeController());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.shouldRenderSpinner).toBe(false);

    (useCourses as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      error: null,
      data: null,
      isFetchingNextPage: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    rerender();

    expect(result.current.isLoading).toBe(true);

    (useCourses as jest.Mock).mockReturnValueOnce({
      isLoading: false,
      error: null,
      data: null,
      isFetchingNextPage: true,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
    });

    rerender();

    expect(result.current.shouldRenderSpinner).toBe(true);
  });
});
