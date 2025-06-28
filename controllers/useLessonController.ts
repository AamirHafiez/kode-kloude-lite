import { LESSON_VIDEO_END_THRESHOLD_PERCENTAGE } from "@/config/lessonConfig";
import useVimeoVideoHandlers from "@/utils/hooks/useVimeoVideoHandlers";
import { LessonSearchParam } from "./types";

const useLessonController = (props: LessonSearchParam) => {
  const videoHandlers = useVimeoVideoHandlers(props["lesson-id"], {
    videoEndThresholdPercentage: LESSON_VIDEO_END_THRESHOLD_PERCENTAGE,
  });

  const getLastTimeToStartVideo = () => {
    if (videoHandlers.isVideoDataPresent()) {
      return Math.trunc(videoHandlers.data!.currentTime);
    } else {
      return 0;
    }
  };

  return {
    videoHandlers,
    getLastTimeToStartVideo,
  };
};

export default useLessonController;
