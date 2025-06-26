import CourseCard from "@/components/organisms/CourseCard/CourseCard";
import { useInfiniteCoursesQuery } from "@/features/courses/useCoursesQuery";
import { useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteCoursesQuery(1);

  const onEndReachedCourseListRef = useRef(false);

  const renderSpinner = () => {
    return <ActivityIndicator style={styles.spinner} />;
  };

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error || data?.pages == null || data.pageParams == null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const coursesData = data.pages
    .flat()
    .map((item) => item.courses.flat())
    .flat();

  return (
    <FlatList
      data={coursesData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <CourseCard details={item} style={{ margin: 20 }} />;
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
  );
}

const styles = StyleSheet.create({
  spinner: {
    paddingBottom: 20,
  },
});
