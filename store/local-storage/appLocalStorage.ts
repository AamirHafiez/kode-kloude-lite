import CoursesModel, { Course } from "@/data/models/CoursesModel";
import { InfiniteData } from "@tanstack/react-query";
import { MMKV } from "react-native-mmkv";
import { VimeoVideoData } from "./types";
import useLocalStorage from "./useLocalStorage";
import { createLocalStorage } from "./utils";

const appLocalStore = new MMKV();

type AppLocalStorageSchema = {
  COURSES: CoursesModel;
  LAST_VIEW_COURSE: Course;
  ENROLLED_COURSES: Course["id"][];
  VIMEO_VIDEO_DATA: Record<string, VimeoVideoData>;
  OFFLINE_COURSES: InfiniteData<CoursesModel, unknown>;
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
