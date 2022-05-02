import { Timestamp } from "firebase/firestore";
import { useTasks } from "../../../db/useTasks";
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
  onPress?: () => void;
}

export const useTaskMenu = (
  taskId: string,
  context: TaskActionButtonProps["context"]
) => {
  const { updateTaskStatus, updateTaskAssignedDate, deleteTask } = useTasks();
  let menu: MenuItem[] = [];

  const moveToBacklogItem: MenuItem = {
    id: "move-to-backlog",
    label: "Move to backlog",
    onPress: () => {
      updateTaskStatus({ id: taskId, status: "backlog" });
    },
  };
  const moveToTodayItem: MenuItem = {
    id: "move-to-today",
    label: "Move to today",
    onPress: () => {
      updateTaskStatus({ id: taskId, status: "none" });
      updateTaskAssignedDate({
        id: taskId,
        assigned_date: Timestamp.now(),
      });
    },
  };
  const moveToTrashItem: MenuItem = {
    id: "move-to-trash",
    label: "Move to trash",
    onPress: () => {
      updateTaskStatus({ id: taskId, status: "deleted" });
    },
  };
  const deleteTaskItem: MenuItem = {
    id: "delete-task",
    label: "Delete task",
    onPress: () => {
      deleteTask({ id: taskId });
    },
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

  return { menu };
};
