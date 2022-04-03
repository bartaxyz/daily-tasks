import { isFuture, isToday, secondsToMilliseconds } from "date-fns";
import { createContext, useContext, useEffect } from "react";
import { TaskData } from "./types";
import { useTasks } from "./useTasks";

interface DataContextValue extends ReturnType<typeof useTasks> {
  tasks: TaskData[];
  overdueTasks: TaskData[];
  todayTasks: TaskData[];
}

export const DataContext = createContext<DataContextValue>({
  tasks: [],
  overdueTasks: [],
  todayTasks: [],
  createTask: async () => {},
  updateTaskBody: async () => {},
  updateTaskStatus: async () => {},
  deleteTask: async () => {},
  updateTaskAssignedDate: async () => {},
  tasksSynced: false,
});

export const DataProvider: React.FC = ({ children }) => {
  const { tasks, ...taskMethods } = useTasks();

  const transformedTasks = tasks.map((task) => ({
    ...task,
    assignedDate: new Date(secondsToMilliseconds(task.assigned_date.seconds)),
  }));

  const overdueTasks = transformedTasks.filter(
    (task) =>
      !(isToday(task.assignedDate) || isFuture(task.assignedDate)) &&
      task.status !== "done" &&
      task.status !== "backlog" &&
      task.status !== "deleted"
  );

  useEffect(() => {
    /**
     * Remove all empty overdue tasks
     */
    overdueTasks.forEach(({ id, body }) => {
      if (!body) {
        taskMethods.deleteTask({ id });
      }
    });
  }, [overdueTasks]);

  const todayTasks = transformedTasks
    .filter((task) => task.status !== "backlog" && task.status !== "deleted")
    .filter(
      (task) => isToday(task.assignedDate) || isFuture(task.assignedDate)
    );

  return (
    <DataContext.Provider
      value={{ tasks, overdueTasks, todayTasks, ...taskMethods }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
