import TBox from "@/components/atoms/TBox/TBox";
import TText from "@/components/atoms/TText/TText";
import LessonHeader from "@/components/organisms/LessonHeader/LessonHeader";
import Screen from "@/components/organisms/Screen/Screen";
import AppConfig from "@/config/AppConfig";
import { CourseModulesSearchParam } from "@/controllers/types";
import useCourseModulesController from "@/controllers/useCourseModulesController";
import { useLocalSearchParams } from "expo-router";
import React, { memo } from "react";
import { SectionList, StyleSheet } from "react-native";

const MemoizedLessonHeader = memo(LessonHeader);

const CourseModules = () => {
  const localSearch = useLocalSearchParams<CourseModulesSearchParam>();

  const { data, error, isLoading, handlePressLesson, courseCompleted } =
    useCourseModulesController(localSearch);

  return (
    <Screen
      isLoading={isLoading}
      error={
        error || data?.modules == null
          ? AppConfig.GENERIC_ERROR_STRING
          : undefined
      }
    >
      <SectionList
        sections={data!.modules.map((module) => ({
          title: module.title,
          data: module.lessons,
        }))}
        ListHeaderComponent={() => (
          <>
            <TText variant="heading3" style={styles.titleText}>
              {data?.title}
            </TText>
            {courseCompleted != null && (
              <TText variant="caption3" style={styles.completedText}>
                (Total Completion: {courseCompleted}%)
              </TText>
            )}
          </>
        )}
        ListFooterComponent={() => <TBox style={styles.spacer} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <MemoizedLessonHeader
              data={item}
              style={styles.textMargins}
              onPress={() => handlePressLesson(item.id)}
            />
          );
        }}
        ItemSeparatorComponent={() => <TBox style={styles.spacer} />}
        renderSectionHeader={({ section: { title } }) => (
          <TText
            variant="heading2"
            style={[styles.textMargins, styles.sectionText]}
          >
            Module: {title}
          </TText>
        )}
      />
    </Screen>
  );
};

export default CourseModules;

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleText: {
    margin: 10,
    textAlign: "center",
  },
  textMargins: {
    marginHorizontal: 20,
  },
  sectionText: {
    color: "navy",
    marginVertical: 20,
  },
  spacer: {
    height: 20,
    aspectRatio: 1,
  },
  completedText: {
    textAlign: "center",
  },
});
