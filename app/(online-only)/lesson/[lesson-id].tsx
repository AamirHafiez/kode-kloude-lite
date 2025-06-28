import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import { LessonSearchParam } from "@/controllers/types";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Lesson = () => {
  const localSearch = useLocalSearchParams<LessonSearchParam>();

  return (
    <TBox>
      <TText>{localSearch["lesson-id"]}</TText>
    </TBox>
  );
};

export default Lesson;

const styles = StyleSheet.create({});
