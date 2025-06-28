import TBox from "@/components/atoms/TBox/TBox";
import TPressable from "@/components/atoms/TPressable/TPressable";
import TText from "@/components/atoms/TText/TText";
import TSurface from "@/components/molecules/TSurface/TSurface";
import { CourseModulesSearchParam } from "@/controllers/types";
import useCourseModulesController from "@/controllers/useCourseModulesController";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SectionList, StyleSheet } from "react-native";

const CourseModules = () => {
  const localSearch = useLocalSearchParams<CourseModulesSearchParam>();

  const { data, error, isLoading } = useCourseModulesController(localSearch);

  if (isLoading) {
    return (
      <TBox>
        <TText>Loading...</TText>
      </TBox>
    );
  }
  if (error || data?.modules == null) {
    return (
      <TBox>
        <TText>Error</TText>
      </TBox>
    );
  }
  return (
    <TBox style={styles.container}>
      <SectionList
        sections={data.modules.map((module) => ({
          title: module.title,
          data: module.lessons,
        }))}
        ListHeaderComponent={() => (
          <TText variant="heading3" style={styles.titleText}>
            {data?.title}
          </TText>
        )}
        ListFooterComponent={() => <TBox style={styles.spacer} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <TPressable onPress={() => {}}>
              <TSurface style={styles.lessonContainer}>
                <TText variant="body4" style={styles.textMargins}>
                  {index + 1}. {item.title}
                </TText>
              </TSurface>
            </TPressable>
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
    </TBox>
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
  lessonContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
