import TBox from "@/components/atoms/TBox/TBox";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type TSurfaceProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const TSurface = (props: TSurfaceProps) => {
  const { children, style } = props;

  return <TBox style={[styles.container, style]}>{children}</TBox>;
};

export default TSurface;

const styles = StyleSheet.create({
  container: {
    borderRadius: 22,
    boxShadow: "3px 3px 10px 2px rgba(0, 0, 0, 0.1)",
  },
});
