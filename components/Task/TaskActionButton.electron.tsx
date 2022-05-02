import { ipcRenderer } from "electron";
import { View } from "react-native";
import { Button } from "../Button";
import { TaskActionButtonProps } from "./types";

export const TaskActionButton: React.FC<TaskActionButtonProps> = ({
  taskId,
  context,
}) => {
  const openMenu = () => {
    ipcRenderer.send("show-task-context-menu", {
      taskId,
      context,
    });
  };

  return (
    <View>
      <Button variant="tertiary" onPress={openMenu} {...{ tabindex: "-1" }}>
        &middot;&middot;&middot;
      </Button>
    </View>
  );
};
