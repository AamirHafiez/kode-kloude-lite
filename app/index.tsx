import TButton from "@/components/atoms/TButton/TButton";
import Screen from "@/components/organisms/Screen/Screen";
import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  // TODO: Remove this
  const logCache = () => {
    const cachedData = AppLocalStorage.get("OFFLINE_COURSES");
    const courses = cachedData?.pages
      .flat()
      .map((item) => item?.courses.flat())
      .filter((item) => item != null)
      .flat();
    courses?.forEach((course) => console.log(course.title));
    console.log();
  };

  return (
    <Screen>
      <TButton onPress={() => router.navigate("/home")} title="Go to Home" />
      <TButton
        onPress={() => AppLocalStorage.deleteAll()}
        title="Delete All Storage"
      />
      {/* // TODO: Remove this */}
      <TButton onPress={logCache} title="Log Storage" />
    </Screen>
  );
}
// Deep Link:
// npx uri-scheme open kodekloudelite://course-detail/postman-essentials --android
// npx uri-scheme open kodekloudelite://course-detail/postman-essentials --ios
