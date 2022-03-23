import { Platform, Text, TextProps } from "react-native";
import { useTheme } from "styled-components/native";

export interface TypographyProps extends TextProps {
  fontWeight?: "normal" | "500" | "bold";
  fontSize?: number;
  textTransform?: "none" | "uppercase" | "capitalize" | "lowercase";
}

const StyledText: React.FC<TypographyProps> = ({
  children,
  fontWeight = "normal",
  fontSize = 14,
  textTransform = "none",
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        {
          // fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          fontWeight,
          fontSize,
          textTransform,
          color: colors.text.default,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const Title: React.FC<TypographyProps> = ({ ...props }) => (
  <Body
    {...props}
    fontWeight="bold"
    fontSize={Platform.OS === "web" ? undefined : 18}
  />
);
const Body: React.FC<TypographyProps> = ({ ...props }) => (
  <StyledText fontSize={14} {...props} />
);

const ButtonLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Body fontWeight="500" {...props} />
);

const TagLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Body fontSize={11} fontWeight="500" {...props} />
);

const TaskLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Body {...props} />
);

export const Typography: React.FC<TypographyProps> & {
  Title: React.FC<TypographyProps>;
  Body: React.FC<TypographyProps>;
  Button: {
    Label: React.FC<TypographyProps>;
  };
  Tag: {
    Label: React.FC<TypographyProps>;
  };
  Task: {
    Label: React.FC<TypographyProps>;
  };
} = ({ children }) => <Text>{children}</Text>;

Typography.Title = Title;
Typography.Body = Body;

Typography.Button = {
  Label: ButtonLabel,
};

Typography.Tag = {
  Label: TagLabel,
};

Typography.Task = {
  Label: TaskLabel,
};
