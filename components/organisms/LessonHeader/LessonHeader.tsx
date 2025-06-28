import TPressable from "@/components/atoms/TPressable/TPressable";
import TText from "@/components/atoms/TText/TText";
import TSurface from "@/components/molecules/TSurface/TSurface";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type LessonHeaderProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  title: string;
};

const LessonHeader = (props: LessonHeaderProps) => {
  const { onPress, style, title } = props;

  return (
    <TPressable onPress={onPress}>
      <TSurface style={[styles.lessonContainer, style]}>
        <TText variant="body4" style={styles.textMargins}>
          {title}
        </TText>
      </TSurface>
    </TPressable>
  );
};

export default LessonHeader;

const styles = StyleSheet.create({
  textMargins: {
    marginHorizontal: 20,
  },
  lessonContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
