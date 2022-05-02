import { TaskActionButtonProps } from "../types";

type MenuIds =
  | "move-to-today"
  | "move-to-backlog"
  | "move-to-trash"
  | "delete-task"
  | "separator";

interface MenuItem {
  id: MenuIds;
  label: string;
  /**
   * To Do: Add onPress here
   */
}

export const getMenu = (context: TaskActionButtonProps["context"]) => {
  let menu: MenuItem[] = [];

  const moveToBacklogItem: MenuItem = {
    id: "move-to-backlog",
    label: "Move to backlog",
  };
  const moveToTodayItem: MenuItem = {
    id: "move-to-today",
    label: "Move to today",
  };
  const moveToTrashItem: MenuItem = {
    id: "move-to-trash",
    label: "Move to trash",
  };
  const deleteTaskItem: MenuItem = {
    id: "delete-task",
    label: "Delete task",
  };

  const separator: MenuItem = {
    id: "separator",
    label: "",
  };

  if (context === "today") {
    menu = [moveToBacklogItem, moveToTrashItem, separator, deleteTaskItem];
  } else if (context === "overdue") {
    menu = [
      moveToTodayItem,
      moveToBacklogItem,
      moveToTrashItem,
      separator,
      deleteTaskItem,
    ];
  } else if (context === "backlog") {
    menu = [moveToTodayItem, moveToTrashItem, separator, deleteTaskItem];
  } else if (context === "trash") {
    menu = [moveToTodayItem, moveToBacklogItem, separator, deleteTaskItem];
  } else if (context === "project") {
    menu = [
      moveToTodayItem,
      moveToBacklogItem,
      moveToTrashItem,
      separator,
      deleteTaskItem,
    ];
  }

  return menu;
};
