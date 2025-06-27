import TBox from "@/components/atoms/TBox/TBox";
import TButton from "@/components/atoms/TButton/TButton";
import TText from "@/components/atoms/TText/TText";
import CourseCard from "@/components/organisms/CourseCard/CourseCard";
import OnlineStatusBar from "@/components/organisms/OnlineStatusBar/OnlineStatusBar";
import useHomeController from "@/controllers/useHomeController";
import { memo } from "react";
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
    coursesData,
    onlineStatus,
    shouldRenderSpinner,
    isLoading,
    error,
    onListMomentumScrollEnd,
    onListEndReached,
    handlePressNavigateDownloads,
  } = useHomeController();

  const renderSpinner = () => {
    return <ActivityIndicator style={styles.spinner} />;
  };

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
        onEndReached={onListEndReached}
        onMomentumScrollEnd={onListMomentumScrollEnd}
        onEndReachedThreshold={0.3}
        ListFooterComponent={shouldRenderSpinner ? renderSpinner() : null}
      />
      {onlineStatus?.isConnected != null && !onlineStatus.isConnected && (
        <TBox style={styles.downloadsContainer}>
          <TButton
            title="Go to downloads"
            onPress={handlePressNavigateDownloads}
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
