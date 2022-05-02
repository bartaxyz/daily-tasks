import { BrowserWindow, ipcMain, Menu } from "electron";

ipcMain.on("show-task-context-menu", (event, { taskId, context }) => {
  console.log("show-task-context-menu", taskId, context);

  const moveToToday = {
    label: "Move to today",
    click: () => {
      event.sender.send("task-context-menu-command", {
        command: "move-to-today",
        taskId,
      });
    },
  };

  const moveToBacklog = {
    label: "Move to backlog",
    click: () => {
      event.sender.send("task-context-menu-command", {
        command: "move-to-backlog",
        taskId,
      });
    },
  };

  const moveToTrash = {
    label: "Move to trash",
    click: () => {
      event.sender.send("task-context-menu-command", {
        command: "move-to-trash",
        taskId,
      });
    },
  };

  const deleteTask = {
    label: "Delete",
    click: () => {
      event.sender.send("task-context-menu-command", {
        command: "delete",
        taskId,
      });
    },
  };

  let template = [];

  if (context === "today") {
    template = [moveToBacklog, moveToTrash, { type: "separator" }, deleteTask];
  } else if (context === "overdue") {
    template = [
      moveToToday,
      moveToBacklog,
      moveToTrash,
      { type: "separator" },
      deleteTask,
    ];
  } else if (context === "backlog") {
    template = [moveToToday, moveToTrash, { type: "separator" }, deleteTask];
  } else if (context === "trash") {
    template = [moveToToday, moveToBacklog, { type: "separator" }, deleteTask];
  } else if (context === "project") {
    template = [
      moveToToday,
      moveToBacklog,
      moveToTrash,
      { type: "separator" },
      deleteTask,
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});
