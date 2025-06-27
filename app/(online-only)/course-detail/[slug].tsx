import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import { CourseDetailSearchParam } from "@/controllers/types";
import useCourseDetailController from "@/controllers/useCourseDetailController";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CourseDetail = () => {
  const localSearch = useLocalSearchParams<CourseDetailSearchParam>();

  const { data, error, isLoading } = useCourseDetailController(localSearch);

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
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default CourseDetail;

const styles = StyleSheet.create({});
