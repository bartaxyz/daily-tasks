import { useCallback } from "react";
import { Platform, View } from "react-native";
import { TaskData } from "../../db/types";
import { Task } from "../Task/Task";
import { TaskListProps } from "./TaskList";

export const TaskList: React.FC<TaskListProps> = ({
  context,
  tasks,
  onTaskStatusChange,
  onTaskFinishedValueChange,
  onTaskEnterPress,
  onTaskDelete,
  onAddTask,
  limit = Infinity,
}) => {
  return (
    <View style={{ marginVertical: 12, marginHorizontal: 12 }}>
      {tasks
        .slice(0, tasks.length === limit + 1 ? limit + 1 : limit)
        .map((task) => (
          <Task
            key={task.id}
            id={task.id}
            context={context}
            editable={Platform.select({
              web: ["today"].includes(context),
              default: false,
            })}
            status={task.status}
            onStatusChange={
              onTaskStatusChange &&
              ((status) => onTaskStatusChange(task, status))
            }
            onFinishedValueChange={
              onTaskFinishedValueChange &&
              ((body) => onTaskFinishedValueChange(task, body))
            }
            onEnterPress={
              onTaskEnterPress &&
              ((selection) => onTaskEnterPress(task, selection))
            }
            onDelete={onTaskDelete && (() => onTaskDelete(task))}
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
  );
};
