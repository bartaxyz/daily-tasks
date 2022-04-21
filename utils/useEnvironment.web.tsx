import { useEffect } from "react";
import { useTheme } from "styled-components/native";

export const useEnvironment = () => {
  const { name, colors } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = colors.background.default;
  }, [name]);

  return undefined;
};
