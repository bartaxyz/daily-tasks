import { isBefore, isFuture, isToday, secondsToMilliseconds } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { createContext, useContext } from "react";
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
  tasksSynced: false,
});

export const DataProvider: React.FC = ({ children }) => {
  const { tasks, ...taskMethods } = useTasks();

  const transformedTasks = tasks.map((task) => ({
    ...task,
    assignedDate: new Date(secondsToMilliseconds(task.assigned_date.seconds)),
  }));

  const overdueTasks = transformedTasks.filter(
    (task) => !(isToday(task.assignedDate) || isFuture(task.assignedDate))
  );

  const todayTasks = transformedTasks.filter(
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
