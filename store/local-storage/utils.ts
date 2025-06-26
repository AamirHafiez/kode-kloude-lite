// Design Pattern: Fascade Design Pattern
import { MMKV } from "react-native-mmkv";

function get<StorageSchema extends object>(storage: MMKV) {
  return function <K extends keyof StorageSchema>(key: K) {
    const storedValue = storage.getString(key as string);
    if (storedValue != null) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue as StorageSchema[K];
    }
  };
}

function set<StorageSchema extends object>(storage: MMKV) {
  return function <K extends keyof StorageSchema>(key: K, value: StorageSchema[K]) {
      const stringifiedValue = JSON.stringify(value);
      storage.set(key as string, stringifiedValue);
  };
}

export function createLocalStorage<StorageSchema extends object> ({
  storage
}: { storage: MMKV  }) {
  return Object.freeze({
    get: get<StorageSchema>(storage),
    set: set<StorageSchema>(storage),
  })
}