import { Platform, TextInputProps as RNTextInputProps } from "react-native";
import styled from "styled-components/native";
import { Typography } from "../Typography";

export interface TextInputProps extends RNTextInputProps {
  label: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <Root>
      <Label>{label}</Label>
      <Input {...props} />
    </Root>
  );
};

const Root = styled.View``;

const Label = styled(Typography.TextInput.Label)`
  color: ${({ theme }) => theme.colors.textInput.label.foreground};
  margin-bottom: 4px;
`;

const Input = styled.TextInput`
  height: 28px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.textInput.background};
  color: ${({ theme }) => theme.colors.textInput.foreground};
  padding: 0 8px;
  ${Platform.select({ web: "outline-width: 0", default: "" })};
`;
