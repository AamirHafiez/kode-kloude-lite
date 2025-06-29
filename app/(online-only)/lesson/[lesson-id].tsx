import Screen from "@/components/organisms/Screen/Screen";
import { LessonSearchParam } from "@/controllers/types";
import useLessonController from "@/controllers/useLessonController";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Vimeo } from "react-native-vimeo-iframe";

const Lesson = () => {
  const localSearch = useLocalSearchParams<LessonSearchParam>();

  const { videoHandlers, getLastTimeToStartVideo } =
    useLessonController(localSearch);

  return (
    <Screen enableBack>
      <Vimeo
        videoId={"347119375"}
        params={`api=1&autoplay=0#t=${getLastTimeToStartVideo()}`}
        handlers={videoHandlers}
      />
    </Screen>
  );
};

export default Lesson;
