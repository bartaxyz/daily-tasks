import { Platform, Text, TextProps } from "react-native";
import { useTheme } from "styled-components/native";

export interface TypographyProps extends TextProps {
  fontWeight?: "normal" | "500" | "bold";
  fontSize?: number;
  textTransform?: "none" | "uppercase" | "capitalize" | "lowercase";
  textDecorationLine?: "none" | "underline" | "line-through";
  textDecorationStyle?: "solid" | "double" | "dotted" | "dashed";
  textAlign?: "left" | "center" | "right";
  color?: string;
}

const StyledText: React.FC<TypographyProps> = ({
  children,
  fontWeight = "normal",
  fontSize = 13,
  textTransform = "none",
  textDecorationLine,
  textDecorationStyle,
  textAlign,
  color,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <Text
      style={[
        {
          fontFamily: Platform.select({
            web: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont",
            default: undefined,
          }),
          fontWeight,
          fontSize,
          textTransform,
          textDecorationLine,
          textDecorationStyle,
          textAlign,
          color: color || colors.text.default,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const Headline: React.FC<TypographyProps> = ({ ...props }) => (
  <Body
    {...props}
    fontSize={Platform.select({ web: 16, default: 24 })}
    fontWeight="bold"
  />
);
const Title: React.FC<TypographyProps> = ({ ...props }) => (
  <Body
    {...props}
    fontWeight="bold"
    fontSize={Platform.OS === "web" ? undefined : 18}
  />
);
const Body: React.FC<TypographyProps> = ({ ...props }) => (
  <StyledText fontSize={Platform.select({ web: 13, default: 16 })} {...props} />
);
const Caption: React.FC<TypographyProps> = ({ ...props }) => (
  <Body {...props} fontSize={Platform.select({ web: 11, default: 12 })} />
);

const ButtonLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Body fontWeight="500" {...props} />
);

const SidebarTitle: React.FC<TypographyProps> = ({ ...props }) => (
  <Body fontWeight="bold" fontSize={11} {...props} />
);
const SidebarButtonLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Body fontWeight="500" {...props} />
);

const TagLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Body fontSize={11} fontWeight="500" {...props} />
);

const TaskLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Body {...props} />
);

const TextInputLabel: React.FC<TypographyProps> = ({ ...props }) => (
  <Caption {...props} />
);

export const Typography: React.FC<TypographyProps> & {
  Headline: React.FC<TypographyProps>;
  Title: React.FC<TypographyProps>;
  Body: React.FC<TypographyProps>;
  Caption: React.FC<TypographyProps>;
  Button: {
    Label: React.FC<TypographyProps>;
  };
  Sidebar: {
    Title: React.FC<TypographyProps>;
    Button: {
      Label: React.FC<TypographyProps>;
    };
  };
  Tag: {
    Label: React.FC<TypographyProps>;
  };
  Task: {
    Label: React.FC<TypographyProps>;
  };
  TextInput: {
    Label: React.FC<TypographyProps>;
  };
} = ({ children }) => <Text>{children}</Text>;

Typography.Headline = Headline;
Typography.Title = Title;
Typography.Body = Body;
Typography.Caption = Caption;

Typography.Button = {
  Label: ButtonLabel,
};

Typography.Sidebar = {
  Title: SidebarTitle,
  Button: {
    Label: SidebarButtonLabel,
  },
};

Typography.Tag = {
  Label: TagLabel,
};

Typography.Task = {
  Label: TaskLabel,
};

Typography.TextInput = {
  Label: TextInputLabel,
};
