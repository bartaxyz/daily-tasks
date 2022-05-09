import React, { useCallback } from "react";
import { Platform, View } from "react-native";
import { TaskData } from "../../db/types";
import { Button } from "../Button";
import { Task, TaskProps } from "../Task/Task";

export interface TaskListProps {
  context: TaskProps["context"];
  tasks: TaskData[];
  onTaskPress?: (task: TaskData) => void;
  onTaskFinishedValueChange?: (task: TaskData, body: string) => void;
  onTaskStatusChange?: (
    task: TaskData,
    status: "none" | "done" | "error"
  ) => void;
  onTaskDelete?: (task: TaskData) => void;
  onTaskEnterPress?: (
    task: TaskData,
    selection: {
      textBeforeSelect: string;
      textAfterSelect: string;
    }
  ) => void;
  onTaskOrderUp?: (task: TaskData) => void;
  onTaskOrderDown?: (task: TaskData) => void;
  onAddTask?: () => void;
  limit?: number;
}

export const TaskList: React.FC<TaskListProps> = ({
  context,
  tasks,
  onTaskStatusChange,
  onAddTask,
  limit = Infinity,
}) => {
  return (
    <React.Fragment>
      <View style={{ marginVertical: 12 }}>
        {tasks
          .slice(0, tasks.length === limit + 1 ? limit + 1 : limit)
          .map((task) => (
            <Task
              key={task.id}
              id={task.id}
              context={context}
              status={task.status}
              onStatusChange={
                onTaskStatusChange &&
                ((status) => onTaskStatusChange(task, status))
              }
            >
              {task.body}
            </Task>
          ))}

        {tasks.length - limit > 1 ? (
          <Task id="" context="none" variant="more" editable={false}>
            {`${tasks.length - limit} more tasks`}
          </Task>
        ) : null}

        {onAddTask && (
          <Task id="" context="today" variant="add" onTaskPress={onAddTask} />
        )}
      </View>

      {/** Empty space for  */}
      {context === "today" && (
        <View style={{ padding: 16, opacity: 0 }}>
          <Button>&nbsp;</Button>
        </View>
      )}
    </React.Fragment>
  );
};
