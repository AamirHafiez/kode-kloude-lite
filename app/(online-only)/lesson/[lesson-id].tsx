import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import { LessonSearchParam } from "@/controllers/types";
import useLessonController from "@/controllers/useLessonController";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";

const Lesson = () => {
  const localSearch = useLocalSearchParams<LessonSearchParam>();

  const { videoHandlers, getLastTimeToStartVideo } =
    useLessonController(localSearch);

  return (
    <TBox style={{ flex: 1 }}>
      <TText>{localSearch["lesson-id"]}</TText>
      <Vimeo
        videoId={"712158285"}
        params={`api=1&autoplay=0#t=${getLastTimeToStartVideo()}`}
        handlers={videoHandlers}
      />
    </TBox>
  );
};

export default Lesson;

const styles = StyleSheet.create({});
