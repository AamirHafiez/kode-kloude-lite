import CoursesModel, { Course } from "@/data/models/CoursesModel";
import { MMKV } from "react-native-mmkv";
import useLocalStorage from "./useLocalStorage";
import { createLocalStorage } from "./utils";

const appLocalStore = new MMKV();

type AppLocalStorageSchema = {
  COURSES: CoursesModel;
  LAST_VIEW_COURSE: Course;
};

const AppLocalStorage = createLocalStorage<AppLocalStorageSchema>({
  storage: appLocalStore,
});

export function useAppLocalStorage<K extends keyof AppLocalStorageSchema>(
  key: K,
) {
  return useLocalStorage<AppLocalStorageSchema, K>(key);
}

export default AppLocalStorage;
