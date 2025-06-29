import { act, renderHook } from "@testing-library/react-hooks";
import useVimeoVideoHandlers from "../useVimeoVideoHandlers";

import { useAppLocalStorage } from "@/store/local-storage/appLocalStorage";

describe("useVimeoVideoHandlers", () => {
  const videoId = "sample-test-video";
  const mockSetVimeoVideoData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initially - videoEnd false and no data", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      undefined,
      mockSetVimeoVideoData,
    ]);

    const { result } = renderHook(() => useVimeoVideoHandlers(videoId));

    expect(result.current.hasVideoEnded).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("loads video data from storage and updates state on focus", () => {
    const storedVideoData = {
      [videoId]: { currentTime: 100, duration: 100, percent: "50" },
    };
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      storedVideoData,
      mockSetVimeoVideoData,
    ]);

    const { result } = renderHook(() => useVimeoVideoHandlers(videoId));

    expect(result.current.hasVideoEnded).toBe(false);

    act(() => {
      result.current.timeupdate({
        currentTime: 100,
        duration: 100,
        percent: "100",
      });
    });

    expect(result.current.hasVideoEnded).toBe(true);
  });

  it("calls setVimeoVideoData on pause & end", () => {
    const storedVideoData = {
      [videoId]: { currentTime: 50, duration: 100, percent: "50" },
    };
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      storedVideoData,
      mockSetVimeoVideoData,
    ]);

    const { result } = renderHook(() => useVimeoVideoHandlers(videoId));

    act(() =>
      result.current.timeupdate({
        currentTime: 80,
        duration: 100,
        percent: "80",
      }),
    );

    act(() => result.current.pause());
    expect(mockSetVimeoVideoData).toHaveBeenCalledWith({
      ...storedVideoData,
      [videoId]: { currentTime: 80, duration: 100, percent: "80" },
    });

    act(() => result.current.ended());
    expect(mockSetVimeoVideoData).toHaveBeenCalledTimes(2);
  });

  it("sets and resets videoEnd based on threshold", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      undefined,
      mockSetVimeoVideoData,
    ]);

    const { result } = renderHook(() =>
      useVimeoVideoHandlers(videoId, { videoEndThresholdPercentage: 70 }),
    );

    act(() =>
      result.current.timeupdate({
        currentTime: 50,
        duration: 100,
        percent: "60",
      }),
    );
    expect(result.current.hasVideoEnded).toBe(false);

    act(() =>
      result.current.timeupdate({
        currentTime: 80,
        duration: 100,
        percent: "75",
      }),
    );
    expect(result.current.hasVideoEnded).toBe(true);

    act(() =>
      result.current.timeupdate({
        currentTime: 60,
        duration: 100,
        percent: "50",
      }),
    );
    expect(result.current.hasVideoEnded).toBe(false);
  });

  it("handles invalid percent values gracefully", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      { [videoId]: { currentTime: 10, duration: 100, percent: "foo" } },
      mockSetVimeoVideoData,
    ]);

    const { result } = renderHook(() => useVimeoVideoHandlers(videoId));

    expect(result.current.hasVideoEnded).toBe(false);

    act(() =>
      result.current.timeupdate({
        currentTime: 10,
        duration: 100,
        percent: "NaN",
      }),
    );
    expect(result.current.hasVideoEnded).toBe(false);
  });

  it("isVideoDataPresent returns correct boolean", () => {
    (useAppLocalStorage as jest.Mock).mockReturnValue([
      { [videoId]: { currentTime: 10, duration: 100, percent: "50" } },
      mockSetVimeoVideoData,
    ]);
    const { result, rerender } = renderHook(() =>
      useVimeoVideoHandlers(videoId),
    );
    expect(result.current.isVideoDataPresent()).toBe(true);

    (useAppLocalStorage as jest.Mock).mockReturnValue([
      undefined,
      mockSetVimeoVideoData,
    ]);
    rerender();
    expect(result.current.isVideoDataPresent()).toBe(false);
  });
});
