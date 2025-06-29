import TBox from "@/components/atoms/TBox/TBox";
import TButton from "@/components/atoms/TButton/TButton";
import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  // TODO: Remove this
  const logCache = () => {
    const cachedData = AppLocalStorage.get("COURSES")?.courses;
    cachedData?.forEach((element) => {
      console.log("index cachedData", element.title);
    });
    console.log();
  };

  return (
    <TBox>
      <TButton onPress={() => router.navigate("/home")} title="Go to Home" />
      {/* // TODO: Remove this */}
      <TButton
        onPress={() => router.navigate("/course-detail/123")}
        title="Go to Course Detail"
      />
      {/* // TODO: Remove this */}
      <TButton
        onPress={() => AppLocalStorage.delete("COURSES")}
        title="Delete Courses Storage"
      />
      <TButton
        onPress={() => AppLocalStorage.deleteAll()}
        title="Delete All Storage"
      />
      {/* // TODO: Remove this */}
      <TButton onPress={logCache} title="Log Storage" />
    </TBox>
  );
}
