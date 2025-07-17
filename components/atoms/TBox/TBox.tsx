import { View, ViewProps } from "react-native";
import Animated from "react-native-reanimated";

const TBox = (props: ViewProps) => {
  return <View {...props} />;
};

export const AnimatedTBox = Animated.createAnimatedComponent(TBox);

export default TBox;
