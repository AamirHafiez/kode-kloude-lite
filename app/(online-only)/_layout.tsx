import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import useOnlineStatus from "@/utils/hooks/useOnlineStatus";
import { Slot } from "expo-router";
import { StyleSheet } from "react-native";

export default function Layout() {
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus.isConnected) {
    return (
      <TBox style={styles.disconnectedContainer}>
        <TText style={styles.offlineText}>You are offline!</TText>
      </TBox>
    );
  }
  return <Slot />;
}

const styles = StyleSheet.create({
  disconnectedContainer: {
    flex: 1,
  },
  offlineText: {
    textAlign: "center",
  },
});
