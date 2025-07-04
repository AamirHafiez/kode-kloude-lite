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
  isLastViewed?: boolean;
  testID?: string;
};

const CourseCard = (props: CourseCardProps) => {
  const { style, details, onPress, isLastViewed = false, testID } = props;

  const handlePress = () => {
    if (onPress) {
      onPress(details);
    }
  };

  return (
    <TPressable
      testID={testID}
      disabled={onPress == null}
      onPress={handlePress}
    >
      <TSurface
        style={[
          styles.container,
          {
            backgroundColor: isLastViewed ? "paleturquoise" : "white",
          },
          style,
        ]}
      >
        {isLastViewed && (
          <TText style={styles.lastViewedHeading} variant="body1">
            Last Viewed
          </TText>
        )}
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
    padding: 10,
  },
  textContainer: {
    padding: 10,
  },
  heading: {
    marginBottom: 10,
  },
  lastViewedHeading: {
    marginBottom: 10,
    color: "midnightblue",
    textAlign: "center",
  },
});
