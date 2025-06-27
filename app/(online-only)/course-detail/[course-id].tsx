import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type CourseDetailSearchParam = { "course-id": string };

const CourseDetail = () => {
  const localSearch = useLocalSearchParams<CourseDetailSearchParam>();

  console.log("localSearch", localSearch["course-id"]);

  return (
    <View>
      <Text>CourseDetail</Text>
    </View>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({});
