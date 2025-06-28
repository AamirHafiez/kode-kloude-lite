import TBox from "@/components/atoms/TBox/TBox";
import TButton from "@/components/atoms/TButton/TButton";
import TText from "@/components/atoms/TText/TText";
import { CourseDetailSearchParam } from "@/controllers/types";
import useCourseDetailController from "@/controllers/useCourseDetailController";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const CourseDetail = () => {
  const localSearch = useLocalSearchParams<CourseDetailSearchParam>();

  const { data, error, isLoading, isEnrolled, onEnrollCourse } =
    useCourseDetailController(localSearch);

  if (isLoading) {
    return (
      <TBox>
        <TText>Loading...</TText>
      </TBox>
    );
  }
  if (error) {
    return (
      <TBox>
        <TText>Error</TText>
      </TBox>
    );
  }
  return (
    <TBox>
      <TText variant="heading3" style={styles.titleText}>
        {data?.title}
      </TText>
      {!isEnrolled() && (
        <TBox style={styles.enrollButtonContainer}>
          <TButton title="Enroll Now" onPress={onEnrollCourse} />
        </TBox>
      )}
      <TText>{JSON.stringify(data)}</TText>
    </TBox>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({
  titleText: {
    margin: 10,
    textAlign: "center",
  },
  enrollButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
