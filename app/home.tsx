import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import CourseCard from "@/components/organisms/CourseCard/CourseCard";
import OnlineStatusBar from "@/components/organisms/OnlineStatusBar/OnlineStatusBar";
import Screen from "@/components/organisms/Screen/Screen";
import AppConfig from "@/config/AppConfig";
import useHomeController from "@/controllers/useHomeController";
import { memo } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

const MemoizedCourseCard = memo(CourseCard);

const Home = () => {
  const {
    coursesData,
    onlineStatus,
    shouldRenderSpinner,
    isLoading,
    error,
    onListMomentumScrollEnd,
    onListEndReached,
    handlePressCourseCard,
    lastViewedCourse,
  } = useHomeController();

  const renderSpinner = () => {
    return <ActivityIndicator style={styles.spinner} />;
  };

  const renderLastViewCourse = () => {
    if (lastViewedCourse == null) return null;

    return (
      <TBox style={styles.lastViewedContainer}>
        <CourseCard
          details={lastViewedCourse}
          onPress={() => handlePressCourseCard(lastViewedCourse)}
          isLastViewed
        />
      </TBox>
    );
  };

  return (
    <Screen
      isLoading={isLoading && onlineStatus.isConnected}
      error={
        error && onlineStatus.isConnected
          ? AppConfig.GENERIC_ERROR_STRING
          : undefined
      }
    >
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
              onPress={() => handlePressCourseCard(item)}
            />
          );
        }}
        onEndReached={onListEndReached}
        onMomentumScrollEnd={onListMomentumScrollEnd}
        onEndReachedThreshold={0.3}
        ListFooterComponent={shouldRenderSpinner ? renderSpinner() : null}
        ListHeaderComponent={renderLastViewCourse()}
      />
    </Screen>
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
  lastViewedContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
