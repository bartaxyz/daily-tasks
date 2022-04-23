import { useEffect } from "react";
import { useTheme } from "styled-components/native";

export const useEnvironment = () => {
  const { name, colors } = useTheme();

  useEffect(() => {
    if (window.location !== window.parent.location) {
      // The page is in an iframe
    } else {
      // The page is not in an iframe

      document.body.style.backgroundColor = colors.background.default;
    }
  }, [name]);

  return undefined;
};
