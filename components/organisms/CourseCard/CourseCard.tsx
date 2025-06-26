import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import ThumbnailImage from "@/components/molecules/ThumbnailImage/ThumbnailImage";
import TSurface from "@/components/molecules/TSurface/TSurface";
import { Course } from "@/data/models/CoursesModel";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type CourseCardProps = {
  style?: StyleProp<ViewStyle>;
  details: Pick<Course, "title" | "tutors" | "thumbnail_url">;
};

const CourseCard = (props: CourseCardProps) => {
  const { style, details } = props;
  return (
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
