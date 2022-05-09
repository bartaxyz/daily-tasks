import { useMemo } from "react";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { rgba } from "polished";
import { useTheme } from "styled-components/native";

export const FinishModalBackdrop: React.FC<BottomSheetBackdropProps> = ({
  animatedIndex,
  style,
}) => {
  console.log("FinishModalBackdrop");
  const { colors } = useTheme();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: rgba(colors.text.default, 0.2),
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};
