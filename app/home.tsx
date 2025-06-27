import TBox from "@/components/atoms/TBox/TBox";
import TButton from "@/components/atoms/TButton/TButton";
import TText from "@/components/atoms/TText/TText";
import CourseCard from "@/components/organisms/CourseCard/CourseCard";
import OnlineStatusBar from "@/components/organisms/OnlineStatusBar/OnlineStatusBar";
import useCourses from "@/features/courses/useCourses";
import useOnlineStatus from "@/utils/hooks/useOnlineStatus";
import { useRouter } from "expo-router";
import { memo, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MemoizedCourseCard = memo(CourseCard);

const Home = () => {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useCourses(1);

  const onlineStatus = useOnlineStatus();

  const router = useRouter();

  const onEndReachedCourseListRef = useRef(false);

  const renderSpinner = () => {
    return <ActivityIndicator style={styles.spinner} />;
  };

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const coursesData = useMemo(() => {
    return data?.pages == null
      ? []
      : data.pages
          .flat()
          .map((item) => item?.courses.flat())
          .filter((item) => item != null)
          .flat();
  }, [data?.pages]);

  if (isLoading && onlineStatus.isConnected) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error && onlineStatus.isConnected) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  return (
    <>
      {onlineStatus?.isConnected != null && (
        <OnlineStatusBar isOnline={onlineStatus.isConnected} />
      )}
      {coursesData.length <= 0 && (
        <TText variant="body4" style={styles.noShowText}>
          Nothing to show, Sorry!{"\n"}👶🏾
        </TText>
      )}
      <FlatList
        data={coursesData}
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
        onEndReached={() => (onEndReachedCourseListRef.current = true)}
        onMomentumScrollEnd={() => {
          onEndReachedCourseListRef.current && onEndReached();
          onEndReachedCourseListRef.current = false;
        }}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage && hasNextPage ? renderSpinner() : null
        }
      />
      {onlineStatus?.isConnected != null && !onlineStatus.isConnected && (
        <TBox style={styles.downloadsContainer}>
          <TButton
            title="Go to downloads"
            onPress={() => router.replace("/downloads")}
          />
        </TBox>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  spinner: {
    paddingBottom: 20,
  },
  noShowText: {
    textAlign: "center",
    paddingTop: 100,
  },
  downloadsContainer: {
    paddingBottom: 30,
  },
});
