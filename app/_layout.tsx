import AppProvider from "@/providers/AppProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "lightskyblue",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "",
          headerShown: false,
        }}
      />
    </AppProvider>
  );
}
