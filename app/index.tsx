import { networkApiAdapter } from "@/data/adapters";
import CoursesRepository from "@/data/respositories/coursesRepository";
import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

const courses = CoursesRepository(networkApiAdapter);

export default function Index() {
  useEffect(() => {
    (async () => {
      const res = await courses.getCourses(1);
      console.log("res", res.data.courses);
    })();
  }, []);

  const handlePressClickMe = () => {
    console.log(AppLocalStorage.get("HEALTH"));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Click Me" onPress={handlePressClickMe} />
    </View>
  );
}
