import { Platform, View } from "react-native";
import { TaskData } from "../../db/types";
import { Task, TaskProps } from "../Task/Task";

export interface TaskListProps {
  context: TaskProps["context"];
  tasks: TaskData[];
  onTaskPress?: (task: TaskData) => void;
  limit?: number;
}

export const TaskList: React.FC<TaskListProps> = ({
  context,
  tasks,
  onTaskPress,
  limit = Infinity,
}) => {
  return (
    <View style={{ marginVertical: 12 }}>
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
          >
            {task.body}
          </Task>
        ))}

      {tasks.length - limit > 1 ? (
        <Task id="" context="none" variant="more" editable={false}>
          {`${tasks.length - limit} more tasks`}
        </Task>
      ) : null}
    </View>
  );
};
