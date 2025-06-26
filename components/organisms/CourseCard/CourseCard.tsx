import TBox from "@/components/atoms/TBox/TBox";
import TPressable from "@/components/atoms/TPressable/TPressable";
import TText from "@/components/atoms/TText/TText";
import ThumbnailImage from "@/components/molecules/ThumbnailImage/ThumbnailImage";
import TSurface from "@/components/molecules/TSurface/TSurface";
import { Course } from "@/data/models/CoursesModel";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type CourseCardProps = {
  style?: StyleProp<ViewStyle>;
  details: Pick<Course, "title" | "tutors" | "thumbnail_url">;
  onPress?: (data: CourseCardProps["details"]) => void;
};

const CourseCard = (props: CourseCardProps) => {
  const { style, details, onPress } = props;

  const handlePress = () => {
    if (onPress) {
      onPress(details);
    }
  };

  return (
    <TPressable disabled={onPress == null} onPress={handlePress}>
      <TSurface style={[styles.container, style]}>
        <ThumbnailImage source={details.thumbnail_url} />
        <TBox style={styles.textContainer}>
          <TText style={styles.heading} variant="body1">
            {details.title}
          </TText>
          <TText variant="caption1">
            By - {details.tutors.map((tutor) => tutor.name).join(", ")}
          </TText>
        </TBox>
      </TSurface>
    </TPressable>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "white",
    padding: 10,
  },
  textContainer: {
    padding: 10,
  },
  heading: {
    marginBottom: 10,
  },
});
