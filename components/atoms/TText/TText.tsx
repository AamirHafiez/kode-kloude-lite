import { Text, TextProps } from "react-native";
import {
  default as textVariants,
  default as variantStyles,
} from "./TTextVariants";

type TTextProps = {
  variant?: keyof typeof textVariants;
} & TextProps;

/**
 * - `h1/semiBold`: heading1
 * - `h2/semiBold`: heading2
 * - `h2/medium`: heading3
 * - `h3/regular`: heading4
 * - `h3/medium`: heading5
 * - `h4/medium`: heading6
 * - `h4/semiBold`: heading7
 * - `h5/semiBold`: heading8
 * - `h5/medium`: heading9
 * - `subtitle/semiBold`: subtitle1
 * - `subtitle/medium`: subtitle2
 * - `b2/bold`: body1
 * - `b2/semiBold`: body2
 * - `b2/medium`: body3
 * - `b2/regular`: body4
 * - `b1/semiBold`: body5
 * - `b1/medium`: body6
 * - `b1/regular`: body7
 * - `b0/bold`: body8
 * - `b0/semiBold`: body9
 * - `b0/medium`: body10
 * - `b0/regular`: body11
 * - `caption/regular`: caption1
 * - `caption/bold`: caption2
 * - `caption/semiBold`: caption3
 */
const TText = (props: TTextProps) => {
  const { variant = "body7", style, ...rest } = props;

  const vStyles = variantStyles[variant];

  return <Text style={[vStyles, style]} {...rest} />;
};

export default TText;
