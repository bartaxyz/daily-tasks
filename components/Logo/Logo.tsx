import { Image } from "react-native";
import logoImage from "../../assets/images/electron-icon.png";

export const Logo = () => {
  return (
    <Image
      source={logoImage}
      style={{ resizeMode: "cover", width: 80, height: 80 }}
    />
  );
};
