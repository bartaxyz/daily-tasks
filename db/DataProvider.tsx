import { isFuture, isToday, secondsToMilliseconds } from "date-fns";
import { createContext, useContext, useEffect } from "react";
import { isEqual } from "lodash";
import { TaskData } from "./types";
import { useProjects } from "./useProjects";
import { useTasks } from "./useTasks";
import { useUser } from "./useUser";

interface DataContextValue
  extends ReturnType<typeof useTasks>,
    ReturnType<typeof useProjects>,
    ReturnType<typeof useUser> {
  tasks: TaskData[];
  overdueTasks: TaskData[];
  todayTasks: TaskData[];
  backlogTasks: TaskData[];
  deletedTasks: TaskData[];
}

export const DataContext = createContext<DataContextValue>({
  tasks: [],
  overdueTasks: [],
  todayTasks: [],
  backlogTasks: [],
  deletedTasks: [],
  createTaskRef: () => undefined,
  createTask: async () => {},
  updateTaskBody: async () => {},
  updateTaskStatus: async () => {},
  deleteTask: async () => {},
  updateTaskAssignedDate: async () => {},
  tasksSynced: false,
  projects: [],
  projectsSynced: false,
  userData: undefined,
  userDataSynced: false,
  setTodayOrder: async () => {},
  insertTaskToOrder: async () => {},
  moveTaskInOrder: async () => {},
});

export const DataProvider: React.FC = ({ children }) => {
  const { tasks, ...taskMethods } = useTasks();
  const { ...projects } = useProjects();
  const { ...userData } = useUser();

  const transformedTasks = tasks.map((task) => ({
    ...task,
    assignedDate: task.assigned_date.toDate(),
  }));

  const todayOrder = userData.userData?.today_order ?? [];

  /**
   * Sort based on order and leave tasks without order at the end
   */
  const sortBasedOnTodayOrder = (a: TaskData, b: TaskData) => {
    const aIndex = todayOrder.findIndex((id) => id === a.id);
    const bIndex = todayOrder.findIndex((id) => id === b.id);

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  };

  const overdueTasks = transformedTasks
    .filter(
      (task) =>
        !(isToday(task.assignedDate) || isFuture(task.assignedDate)) &&
        task.status !== "done" &&
        task.status !== "backlog" &&
        task.status !== "deleted"
    )
    /** Sort based on order array */
    .sort(sortBasedOnTodayOrder);

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
    .filter((task) => isToday(task.assignedDate))
    .sort(sortBasedOnTodayOrder);
  /* .sort((a, b) => {
      if (a.status === "done" && b.status !== "done") return -1;
      if (a.status !== "done" && b.status === "done") return 1;
      return 0;
    }); */

  const backlogTasks = transformedTasks.filter(
    (task) => task.status === "backlog"
  );

  const deletedTasks = transformedTasks.filter(
    (task) => task.status === "deleted"
  );

  /**
   * Combined tasks from today and overdue
   */
  const combinedTasks = [...overdueTasks, ...todayTasks];
  const todayOrderIds = combinedTasks.map((task) => task.id);

  /**
   * If order list is out of sync, update it to reflect all tasks
   */
  useEffect(() => {
    /**
     * If today_order isn't in sync with tasks, update it
     */
    if (userData.userData) {
      const todayOrder = userData.userData.today_order;

      if (!isEqual(todayOrderIds, todayOrder)) {
        userData.setTodayOrder(todayOrderIds);
      }
    }
  }, [JSON.stringify(todayOrderIds)]);

  return (
    <DataContext.Provider
      value={{
        tasks,
        overdueTasks,
        todayTasks,
        backlogTasks,
        deletedTasks,
        ...taskMethods,
        ...projects,
        ...userData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
