import { useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { useContextMenuHandler as useContextMenuHandlerBase } from "../utils/useContextMenuHandler";

export const useContextMenuHandler: typeof useContextMenuHandlerBase = (
  taskMethods
) => {
  useEffect(() => {
    const deleteTaskHandler = (event: any) => {
      taskMethods.deleteTask({ id: event.detail.taskId });
    };
    const moveToBacklogHandler = (event: any) => {
      taskMethods.updateTaskStatus({
        id: event.detail.taskId,
        status: "backlog",
      });
    };
    const moveToTodayHandler = (event: any) => {
      taskMethods.updateTaskStatus({
        id: event.detail.taskId,
        status: "none",
      });
      taskMethods.updateTaskAssignedDate({
        id: event.detail.taskId,
        assigned_date: Timestamp.now(),
      });
    };
    const moveToTrashHandler = (event: any) => {
      taskMethods.updateTaskStatus({
        id: event.detail.taskId,
        status: "deleted",
      });
    };

    document.body.addEventListener("task-delete", deleteTaskHandler);
    document.body.addEventListener(
      "task-move-to-backlog",
      moveToBacklogHandler
    );
    document.body.addEventListener("task-move-to-today", moveToTodayHandler);
    document.body.addEventListener("task-move-to-trash", moveToTrashHandler);

    return () => {
      document.body.removeEventListener("task-delete", deleteTaskHandler);
      document.body.removeEventListener(
        "task-move-to-backlog",
        moveToBacklogHandler
      );
      document.body.removeEventListener(
        "task-move-to-today",
        moveToTodayHandler
      );
      document.body.removeEventListener(
        "task-move-to-trash",
        moveToTrashHandler
      );
    };
  }, []);
};
