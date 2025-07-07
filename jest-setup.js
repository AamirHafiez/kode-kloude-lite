import { jest } from "@jest/globals";

// Mocking App Local Storage
jest.mock("@/store/local-storage/appLocalStorage", () => ({
  useAppLocalStorage: jest.fn(() => [undefined, jest.fn()]),
  get: jest.fn(),
}));

// Mocking Expo Router
export const mockNavigate = jest.fn();
jest.mock("expo-router", () => ({
  useFocusEffect: (callback) => callback(),
  useRouter: jest.fn(() => ({
    navigate: mockNavigate,
  })),
}));

// Mocking MMKV
jest.mock("react-native-mmkv", () => ({
  useMMKVString: jest.fn(),
}));

// Mocking useOnlineStatus hook
jest.mock("@/utils/hooks/useOnlineStatus");
