import TBox from "@/components/atoms/TBox/TBox";
import TButton from "@/components/atoms/TButton/TButton";
import TText from "@/components/atoms/TText/TText";
import { CourseDetailSearchParam } from "@/controllers/types";
import useCourseDetailController from "@/controllers/useCourseDetailController";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const CourseDetail = () => {
  const localSearch = useLocalSearchParams<CourseDetailSearchParam>();

  const {
    data,
    error,
    isLoading,
    isEnrolled,
    onEnrollCourse,
    onStartLearning,
  } = useCourseDetailController(localSearch);

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
    <ScrollView>
      <TBox>
        <TText variant="heading3" style={styles.titleText}>
          {data?.title}
        </TText>
        <TBox style={styles.enrollButtonContainer}>
          <TButton
            title={isEnrolled() ? "Start Learning" : "Enroll Now"}
            onPress={isEnrolled() ? onStartLearning : onEnrollCourse}
          />
        </TBox>
        <TText style={styles.descriptionText}>{data?.description}</TText>
      </TBox>
    </ScrollView>
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
  descriptionText: {
    marginHorizontal: 20,
    paddingBottom: 30,
  },
});
