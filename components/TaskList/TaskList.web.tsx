import { Platform, View } from "react-native";
import { Task } from "../Task/Task";
import { TaskListProps } from "./TaskList";

export const TaskList: React.FC<TaskListProps> = ({
  context,
  tasks,
  onTaskPress,
  limit = Infinity,
}) => {
  return (
    <View>
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
