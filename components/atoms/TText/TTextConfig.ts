import { StyleSheet } from "react-native";

export const fontFamilies = StyleSheet.create({
  semiBold: {
    fontWeight: "semibold",
  },
  medium: {
    fontWeight: "medium",
  },
  regular: {
    fontWeight: "regular",
  },
  bold: {
    fontWeight: "bold",
  },
});

export const typeScale = StyleSheet.create({
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    lineHeight: 24,
  },
  h5: {
    fontSize: 16,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  b2: {
    fontSize: 14,
    lineHeight: 18,
  },
  b1: {
    fontSize: 12,
    lineHeight: 18,
  },
  b0: {
    fontSize: 10,
    lineHeight: 14,
  },
  caption: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1.1,
  },
});
