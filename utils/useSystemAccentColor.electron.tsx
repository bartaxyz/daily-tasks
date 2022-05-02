import { useEffect, useState } from "react";

let ipcRenderer: Electron.IpcRenderer = require("electron").ipcRenderer;

export const useSystemAccentColor = () => {
  const [systemAccentColor, setSystemAccentColor] = useState<string>("red");

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.invoke("get-accent-color").then((color) => {
        setSystemAccentColor(color);
      });
    }
  }, []);

  return systemAccentColor;
};

const taskContextMenuCommand = new Event("task-context-menu-command");

ipcRenderer.on("task-context-menu-command", (event, { command, taskId }) => {
  console.log(`Received command: ${command} for task ${taskId}`);

  if (command === "delete") {
    document.body.dispatchEvent(
      new CustomEvent("task-delete", { detail: { taskId } })
    );
  } else if (command === "move-to-backlog") {
    document.body.dispatchEvent(
      new CustomEvent("task-move-to-backlog", { detail: { taskId } })
    );
  } else if (command === "move-to-today") {
    document.body.dispatchEvent(
      new CustomEvent("task-move-to-today", { detail: { taskId } })
    );
  } else if (command === "move-to-trash") {
    document.body.dispatchEvent(
      new CustomEvent("task-move-to-trash", { detail: { taskId } })
    );
  }
});
