import { act, renderHook } from "@testing-library/react-native";
import useLocalStorage from "../useLocalStorage";

import { useMMKVString } from "react-native-mmkv";

describe("useLocalStorage", () => {
  const key = "TEST_STORAGE_KEY";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize value as undefined if nothing stored", () => {
    (useMMKVString as jest.Mock).mockReturnValue([null, jest.fn()]);

    const { result } = renderHook(() =>
      useLocalStorage<{ TEST_STORAGE_KEY: string }, "TEST_STORAGE_KEY">(key),
    );

    const [value] = result.current;

    expect(value).toBeUndefined();
  });

  it("should parse stored JSON string value correctly", () => {
    const storedData = JSON.stringify({ foo: "bar", count: 5 });
    (useMMKVString as jest.Mock).mockReturnValue([storedData, jest.fn()]);

    const { result } = renderHook(() =>
      useLocalStorage<
        { TEST_STORAGE_KEY: { foo: string; count: number } },
        "TEST_STORAGE_KEY"
      >(key),
    );

    const [value] = result.current;
    expect(value).toEqual({ foo: "bar", count: 5 });
  });

  it("should return undefined on invalid JSON string", () => {
    (useMMKVString as jest.Mock).mockReturnValue(["not-json", jest.fn()]);

    const { result } = renderHook(() =>
      useLocalStorage<{ TEST_STORAGE_KEY: any }, "TEST_STORAGE_KEY">(key),
    );

    const [value] = result.current;
    expect(value).toBeUndefined();
  });

  it("should call setter function and store stringified value", () => {
    const mockSetString = jest.fn();
    (useMMKVString as jest.Mock).mockReturnValue([null, mockSetString]);

    const { result } = renderHook(() =>
      useLocalStorage<
        { TEST_STORAGE_KEY: { foo: string } },
        "TEST_STORAGE_KEY"
      >(key),
    );

    const [, setValue] = result.current;

    act(() => {
      setValue({ foo: "baz" });
    });

    expect(mockSetString).toHaveBeenCalledTimes(1);
    expect(mockSetString).toHaveBeenCalledWith(JSON.stringify({ foo: "baz" }));
  });
});
