import TBox from "@/components/atoms/TBox/TBox";
import TButton from "@/components/atoms/TButton/TButton";
import TText from "@/components/atoms/TText/TText";
import CourseCard from "@/components/organisms/CourseCard/CourseCard";
import AppLocalStorage from "@/store/local-storage/appLocalStorage";
import useOnlineStatus from "@/utils/hooks/useOnlineStatus";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";

const MemoizedCourseCard = memo(CourseCard);

const Downloads = () => {
  const onlineStatus = useOnlineStatus();

  const router = useRouter();

  const cachedData = AppLocalStorage.get("COURSES")?.courses;

  return (
    <>
      {cachedData != null && cachedData.length <= 0 && (
        <TText variant="body4" style={styles.noShowText}>
          Nothing to show, Sorry!{"\n"}👶🏾
        </TText>
      )}
      <FlatList
        data={cachedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <MemoizedCourseCard
              details={item}
              style={{ margin: 20 }}
              onPress={(data) => console.log("data", data)}
            />
          );
        }}
      />
      {onlineStatus?.isConnected != null && onlineStatus.isConnected && (
        <TBox style={styles.downloadsContainer}>
          <TButton title="Go Online" onPress={() => router.replace("/home")} />
        </TBox>
      )}
    </>
  );
};

export default Downloads;

const styles = StyleSheet.create({
  noShowText: {
    textAlign: "center",
    paddingTop: 100,
  },
  downloadsContainer: {
    paddingBottom: 30,
  },
});
