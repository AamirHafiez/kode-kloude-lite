import TBox from "@/components/atoms/TBox/TBox";
import TPressable from "@/components/atoms/TPressable/TPressable";
import TText from "@/components/atoms/TText/TText";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  isLoading?: boolean;
  error?: string;
  children: React.ReactNode;
  enableBack?: boolean;
};

const Screen = (props: ScreenProps) => {
  const { error, isLoading, children, enableBack = false } = props;

  const router = useRouter();

  const onPressBack = () => {
    if (router.canGoBack()) router.back();
  };

  const renderBack = () => {
    if (!enableBack || !router.canGoBack()) return null;
    return (
      <TBox style={styles.screenHeaderBackContainer}>
        <TPressable onPress={onPressBack}>
          <TText style={styles.screenHeaderBackText} variant="body1">
            ⬅ {"  "}Go Back
          </TText>
        </TPressable>
      </TBox>
    );
  };

  const renderStatusBar = () => {
    return <StatusBar style="light" />;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        {renderStatusBar()}
        {renderBack()}
        <TBox style={[styles.container, styles.containerCenterElements]}>
          <ActivityIndicator />
        </TBox>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        {renderStatusBar()}
        {renderBack()}
        <TBox style={[styles.container, styles.containerCenterElements]}>
          <TText>{error}</TText>
        </TBox>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderStatusBar()}
      {renderBack()}
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerCenterElements: {
    justifyContent: "center",
    alignItems: "center",
  },
  screenHeaderBackContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  screenHeaderBackText: {
    color: "black",
  },
});
