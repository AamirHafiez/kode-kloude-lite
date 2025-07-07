import { StyleSheet } from "react-native";
import { fontFamilies, typeScale } from "./TTextConfig";

const variantStyles = StyleSheet.create({
  heading1: {
    ...typeScale.h1,
    ...fontFamilies.semiBold,
  },
  heading2: {
    ...typeScale.h2,
    ...fontFamilies.semiBold,
  },
  heading3: {
    ...typeScale.h2,
    ...fontFamilies.medium,
  },
  heading4: {
    ...typeScale.h3,
    ...fontFamilies.regular,
  },
  heading5: {
    ...typeScale.h3,
    ...fontFamilies.medium,
  },
  heading6: {
    ...typeScale.h4,
    ...fontFamilies.medium,
  },
  heading7: {
    ...typeScale.h4,
    ...fontFamilies.semiBold,
  },
  heading8: {
    ...typeScale.h5,
    ...fontFamilies.semiBold,
  },
  heading9: {
    ...typeScale.h5,
    ...fontFamilies.medium,
  },
  subtitle1: {
    ...typeScale.subtitle,
    ...fontFamilies.semiBold,
  },
  subtitle2: {
    ...typeScale.subtitle,
    ...fontFamilies.medium,
  },
  body1: {
    ...typeScale.b2,
    ...fontFamilies.bold,
  },
  body2: {
    ...typeScale.b2,
    ...fontFamilies.semiBold,
  },
  body3: {
    ...typeScale.b2,
    ...fontFamilies.medium,
  },
  body4: {
    ...typeScale.b2,
    ...fontFamilies.regular,
  },
  body5: {
    ...typeScale.b1,
    ...fontFamilies.semiBold,
  },
  body6: {
    ...typeScale.b1,
    ...fontFamilies.medium,
  },
  body7: {
    ...typeScale.b1,
    ...fontFamilies.regular,
  },
  body8: {
    ...typeScale.b0,
    ...fontFamilies.bold,
  },
  body9: {
    ...typeScale.b0,
    ...fontFamilies.semiBold,
  },
  body10: {
    ...typeScale.b0,
    ...fontFamilies.medium,
  },
  body11: {
    ...typeScale.b0,
    ...fontFamilies.regular,
  },
  caption1: {
    ...typeScale.caption,
    ...fontFamilies.regular,
  },
  caption2: {
    ...typeScale.caption,
    ...fontFamilies.bold,
  },
  caption3: {
    ...typeScale.caption,
    ...fontFamilies.semiBold,
  },
});

export default variantStyles;
