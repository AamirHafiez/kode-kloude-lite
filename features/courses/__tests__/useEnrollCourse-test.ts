import { useAppLocalStorage } from "@/store/local-storage/appLocalStorage";
import { act, renderHook } from "@testing-library/react-hooks";
import useEnrollCourse from "../useEnrollCourse";

describe("useEnrollCourse", () => {
  const mockSetEnrolledCourse = jest.fn();
  const mockCourse = { id: "course-id" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns COULD_NOT_ENROLL if no course provided", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      [],
      mockSetEnrolledCourse,
    ]);

    const { result } = renderHook(() => useEnrollCourse(undefined));

    const enrollmentResult = result.current.onEnrollCourse();
    expect(enrollmentResult).toBe("COULD_NOT_ENROLL");
  });

  it("enrolls a course when enrolledCourses is undefined or empty", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      undefined,
      mockSetEnrolledCourse,
    ]);

    const { result } = renderHook(() => useEnrollCourse(mockCourse as any));

    let enrollmentResult: string = "";
    act(() => {
      enrollmentResult = result.current.onEnrollCourse();
    });

    expect(enrollmentResult).toBe("ENROLLED");
    expect(mockSetEnrolledCourse).toHaveBeenCalledWith([mockCourse.id]);
  });

  it("does not enroll a course if already enrolled", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      [mockCourse.id],
      mockSetEnrolledCourse,
    ]);

    const { result } = renderHook(() => useEnrollCourse(mockCourse as any));

    const enrollmentResult = result.current.onEnrollCourse();
    expect(enrollmentResult).toBe("ALREADY_ENROLLED");
    expect(mockSetEnrolledCourse).not.toHaveBeenCalled();
  });

  it("enrolls a course not in enrolledCourses by adding it", () => {
    const prevEnrolled = ["course-2"];
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      prevEnrolled,
      mockSetEnrolledCourse,
    ]);

    const { result } = renderHook(() => useEnrollCourse(mockCourse as any));

    act(() => {
      const enrollmentResult = result.current.onEnrollCourse();
      expect(enrollmentResult).toBe("ENROLLED");
    });

    // Should call setEnrolledCourse with previous plus new course id
    expect(mockSetEnrolledCourse).toHaveBeenCalledWith(
      expect.arrayContaining(["course-2", mockCourse.id]),
    );
  });

  it("isEnrolled returns false if no course passed", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      [mockCourse.id],
      mockSetEnrolledCourse,
    ]);

    const { result } = renderHook(() => useEnrollCourse(undefined));

    expect(result.current.isEnrolled()).toBe(false);
  });

  it("isEnrolled returns true if course id is in enrolledCourses", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      [mockCourse.id],
      mockSetEnrolledCourse,
    ]);

    const { result } = renderHook(() => useEnrollCourse(mockCourse as any));

    expect(result.current.isEnrolled()).toBe(true);
  });

  it("isEnrolled returns false if course id is not in enrolledCourses", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      ["another-course"],
      mockSetEnrolledCourse,
    ]);

    const { result } = renderHook(() => useEnrollCourse(mockCourse as any));

    expect(result.current.isEnrolled()).toBe(false);
  });
});
