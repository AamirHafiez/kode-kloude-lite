import TPressable from "@/components/atoms/TPressable/TPressable";
import TText from "@/components/atoms/TText/TText";
import TSurface from "@/components/molecules/TSurface/TSurface";
import lessonConfig from "@/config/lessonConfig";
import { Lesson } from "@/data/models/CourseDetailsModel";
import useVimeoVideoHandlers from "@/utils/hooks/useVimeoVideoHandlers";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type LessonHeaderProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  data: Lesson;
};

const LessonHeader = (props: LessonHeaderProps) => {
  const { onPress, style, data } = props;

  const { hasVideoEnded, data: lessonData } = useVimeoVideoHandlers(data.id, {
    videoEndThresholdPercentage:
      lessonConfig.LESSON_VIDEO_END_THRESHOLD_PERCENTAGE,
  });

  const percentageComplete = lessonData?.percent ?? 0;

  return (
    <TPressable onPress={onPress}>
      <TSurface style={[styles.lessonContainer, style]}>
        <TText variant="body4" style={[styles.textMargins, styles.lessonTitle]}>
          {data.position}. {data.title}
        </TText>
        <TText
          variant="body4"
          style={[styles.textMargins, styles.rightContentText]}
        >
          {hasVideoEnded ? "✅" : `${percentageComplete}%`}
        </TText>
      </TSurface>
    </TPressable>
  );
};

export default LessonHeader;

const styles = StyleSheet.create({
  textMargins: {
    // marginHorizontal: 20,
  },
  lessonTitle: {
    width: "85%",
    // backgroundColor: "red",
  },
  rightContentText: {
    width: "15%",
    // backgroundColor: "blue",
    textAlign: "center",
  },
  lessonContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
