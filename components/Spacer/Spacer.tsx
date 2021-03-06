import { View } from "react-native";

type Sizes =
  | 8
  | 12
  | 16
  | 24
  | 36
  | 40
  | 48
  | 56
  | 64
  | 72
  | 80
  | 88
  | 96
  | 112
  | 128
  | 144
  | 160
  | 176
  | 192
  | 208
  | 224
  | 240
  | 256
  | 272
  | 288
  | 304
  | 320
  | 336
  | 352
  | 368
  | 384
  | 400
  | 416
  | 432
  | 448
  | 464
  | 480
  | 496
  | 512;

export interface SpacerProps {
  height?: Sizes;
  width?: Sizes;
}

export const Spacer: React.FC<SpacerProps> = ({ height, width }) => {
  return <View style={{ height, width }} />;
};
