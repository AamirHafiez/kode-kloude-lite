import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import axios from "axios";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    (async () => {
      const res = await axios.get<{ success: boolean }>(
        "http://10.23.83.108:8092/health"
      );
      console.log("res", res.data);
      AppLocalStorage.set("HEALTH", res.data);
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
