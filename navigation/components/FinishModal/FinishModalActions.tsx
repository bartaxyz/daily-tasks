import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { Section, Typography } from "../../../components";
import { IconButton } from "../../../components/IconButton";

export interface FinishModalActionsProps {
  mode: "overdue" | "today";
  onBacklogPress: () => void;
  onTodayTomorrowPress: () => void;
  onTrashPress: () => void;
}

export const FinishModalActions: React.FC<FinishModalActionsProps> = ({
  mode,
  onBacklogPress,
  onTodayTomorrowPress,
  onTrashPress,
}) => {
  const { colors } = useTheme();

  return (
    <Section.Content inset="XS">
      <Typography.Caption
        textAlign="center"
        color={colors.text.secondary}
        style={{
          margin: 8,
        }}
      >
        Where should this task go?
      </Typography.Caption>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <IconButton label="Backlog" icon="archive" onPress={onBacklogPress} />
        <View style={{ width: 8 }} />

        <IconButton
          label={mode === "overdue" ? "Today" : "Tomorrow"}
          icon="sunset"
          onPress={onTodayTomorrowPress}
        />

        <View style={{ width: 8 }} />

        <IconButton label="Trash" icon="trash" onPress={onTrashPress} />
      </View>
    </Section.Content>
  );
};
