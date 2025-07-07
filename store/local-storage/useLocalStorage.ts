import { useMMKVString } from "react-native-mmkv";

const useLocalStorage = <
  StorageSchema extends object,
  K extends keyof StorageSchema,
>(
  key: K,
) => {
  const [v, sV] = useMMKVString(key as string);

  const setValue = (value: StorageSchema[K]) => {
    const stringifiedValue = JSON.stringify(value);
    sV(stringifiedValue);
  };

  let parsedValue: StorageSchema[K] | undefined;
  try {
    parsedValue = v ? (JSON.parse(v) as StorageSchema[K]) : undefined;
  } catch {
    parsedValue = undefined;
  }

  return [parsedValue, setValue] as const;
};

export default useLocalStorage;
