import { useAppLocalStorage } from "@/store/local-storage/appLocalStorage";
import { VimeoVideoData } from "@/store/local-storage/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";

type VimeoVideoHandlerOptions = {
  videoEndThresholdPercentage?: number; // above this percentage video will be marked as ended
};

const useVimeoVideoHandlers = (
  videoId: string,
  options?: VimeoVideoHandlerOptions,
) => {
  const { videoEndThresholdPercentage = 100 } = options ?? {};
  const [videoEnd, setVideoEnd] = useState(false);

  const [vimeoVideoData, setVimeoVideoData] =
    useAppLocalStorage("VIMEO_VIDEO_DATA");

  const timeUpdateRef = useRef<VimeoVideoData>({
    currentTime: 0,
    duration: 0,
    percent: "0",
  });

  useFocusEffect(
    useCallback(() => {
      if (!isVideoDataPresent()) return;
      const videoData = vimeoVideoData![videoId]!;
      onTimeUpdate(videoData);

      return () => {
        onTimeUpdate(videoData);
      };
    }, []),
  );

  const onTimeUpdate = (data: VimeoVideoData) => {
    timeUpdateRef.current = data;
    const toNumPercentage = Number(data.percent);
    if (Number.isNaN(toNumPercentage)) return;
    if (!videoEnd && toNumPercentage >= videoEndThresholdPercentage) {
      setVideoEnd(true);
    } else if (videoEnd && toNumPercentage < videoEndThresholdPercentage) {
      setVideoEnd(false);
    }
  };

  const onPause = () => {
    updateVideoData();
  };

  const onEnd = () => {
    updateVideoData();
  };

  const updateVideoData = () => {
    if (vimeoVideoData == null) {
      setVimeoVideoData({
        [videoId]: timeUpdateRef.current,
      });
      return;
    }
    setVimeoVideoData({
      ...vimeoVideoData,
      [videoId]: timeUpdateRef.current,
    });
  };

  const isVideoDataPresent = () => {
    if (vimeoVideoData?.[videoId] != null) {
      return true;
    }
    return false;
  };

  const getHasVideoEnded = () => {
    if (!isVideoDataPresent()) return false;
    const videoData = vimeoVideoData![videoId]!;
    const toNumPercentage = Number(videoData.percent);
    if (Number.isNaN(toNumPercentage)) return false;
    if (toNumPercentage >= videoEndThresholdPercentage) return true;
    return false;
  };

  return {
    pause: onPause,
    ended: onEnd,
    timeupdate: onTimeUpdate,
    isVideoDataPresent,
    data: vimeoVideoData?.[videoId],
    getHasVideoEnded,
    hasVideoEnded: videoEnd,
  };
};

export default useVimeoVideoHandlers;
