import { AnimatedTBox } from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { FadeOutUp } from "react-native-reanimated";

type OnlineStatusBarProps = {
  isOnline: boolean;
};

const OnlineStatusBar = (props: OnlineStatusBarProps) => {
  const { isOnline } = props;

  const [isVisible, setIsVisible] = useState(!isOnline ? true : false);

  const wentOfflineOnce = useRef(false);

  useEffect(() => {
    if (isOnline && wentOfflineOnce.current) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } else if (!isOnline) {
      wentOfflineOnce.current = true;
      setIsVisible(true);
    }
  }, [isOnline]);

  if (!isVisible) return null;
  return (
    <AnimatedTBox
      exiting={FadeOutUp}
      style={isOnline ? styles.onlineContainer : styles.offlineContainer}
    >
      <TText style={styles.text} variant="caption2">
        {isOnline ? "BACK ONLINE" : "OFFLINE"}
      </TText>
    </AnimatedTBox>
  );
};

export default OnlineStatusBar;

const styles = StyleSheet.create({
  onlineContainer: {
    backgroundColor: "green",
  },
  offlineContainer: {
    backgroundColor: "red",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
