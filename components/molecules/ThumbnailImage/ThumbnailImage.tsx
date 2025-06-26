import TBox from "@/components/atoms/TBox/TBox";
import TImage from "@/components/atoms/TImage/TImage";
import { ImageProps } from "expo-image";
import { StyleSheet } from "react-native";

type ThumbnailImageProps = {
  source: ImageProps["source"];
};

const ThumbnailImage = (props: ThumbnailImageProps) => {
  const { source } = props;

  return (
    <TBox style={styles.container}>
      <TImage style={styles.image} source={source} contentFit="contain" />
    </TBox>
  );
};

export default ThumbnailImage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 2 / 1.2,
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 22,
    borderCurve: "circular",
  },
});
