import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

type ScreenProps = {
  isLoading?: boolean;
  error?: string;
  children: React.ReactNode;
};

const Screen = (props: ScreenProps) => {
  const { error, isLoading, children } = props;

  if (isLoading) {
    return (
      <TBox style={[styles.container, styles.containerCenterElements]}>
        <ActivityIndicator />
      </TBox>
    );
  }
  if (error) {
    return (
      <TBox style={[styles.container, styles.containerCenterElements]}>
        <TText>{error}</TText>
      </TBox>
    );
  }
  return <TBox style={styles.container}>{children}</TBox>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCenterElements: {
    justifyContent: "center",
    alignItems: "center",
  },
});
