import { ipcRenderer } from "electron";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Menu } from "react-native-paper";
import { Button } from "../Button";
import { TaskActionButtonProps } from "./types";

export const TaskActionButton: React.FC<TaskActionButtonProps> = () => {
  const openMenu = () => {
    ipcRenderer.send("show-task-context-menu");
  };

  return (
    <View>
      <Button variant="tertiary" onPress={openMenu} {...{ tabindex: "-1" }}>
        &middot;&middot;&middot;
      </Button>
    </View>
  );
};
