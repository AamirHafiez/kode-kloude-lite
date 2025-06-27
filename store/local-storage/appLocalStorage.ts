import CoursesModel, { Course } from "@/data/models/CoursesModel";
import { MMKV } from "react-native-mmkv";
import { createLocalStorage } from "./utils";

const appLocalStore = new MMKV();
type LocalStorageSchema = {
  COURSES: CoursesModel;
  LAST_VIEW_COURSE: Course;
};

const AppLocalStorage = createLocalStorage<LocalStorageSchema>({
  storage: appLocalStore,
});
export default AppLocalStorage;
