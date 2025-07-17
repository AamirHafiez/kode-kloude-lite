import TBox from "@/components/atoms/TBox/TBox";
import TButton from "@/components/atoms/TButton/TButton";
import TText from "@/components/atoms/TText/TText";
import Screen from "@/components/organisms/Screen/Screen";
import AppConfig from "@/config/AppConfig";
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

  return (
    <Screen
      enableBack
      isLoading={isLoading}
      error={error ? AppConfig.GENERIC_ERROR_STRING : undefined}
    >
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
    </Screen>
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
