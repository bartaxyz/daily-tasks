import { Timestamp } from "firebase/firestore";
import { rgba } from "polished";
import { createContext, useContext, useState } from "react";
import { Animated } from "react-native";
import { useTheme } from "styled-components/native";
import { TaskData } from "../../../db/types";
import { useTasks } from "../../../db/useTasks";

interface FinishModalContextType {
  mode: "overdue" | "today";
  visible: boolean;
  currentTask?: TaskData;
  tasks: TaskData[];
  dismissFinishModal: () => void;
  showFinishModal: (_: {
    mode?: "overdue" | "today";
    tasks: TaskData[];
  }) => void;
  finishNextTask: (_: {
    status?: "backlog" | "deleted";
    assigned_date?: Timestamp;
  }) => void;
}

const FinishModalContext = createContext<FinishModalContextType>({
  mode: "overdue",
  visible: false,
  tasks: [],
  dismissFinishModal: () => {},
  showFinishModal: () => {},
  finishNextTask: () => {},
});

export const FinishModalProvider: React.FC = ({ children }) => {
  const { colors } = useTheme();
  const { updateTaskStatus, updateTaskAssignedDate } = useTasks();
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<FinishModalContextType["mode"]>("overdue");
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [colorAnimatedValue] = useState(new Animated.Value(0));

  const backgroundColor = colors.background.default;

  const showFinishModal: FinishModalContextType["showFinishModal"] = ({
    mode = "today",
    tasks,
  }) => {
    Animated.timing(colorAnimatedValue, {
      toValue: 1,
      duration: 640,
      useNativeDriver: false,
    }).start();
    setVisible(true);
    setMode(mode);

    setTasks(
      JSON.parse(
        JSON.stringify(
          tasks.filter((task) => task.status === "none" || !task.status)
        )
      )
    );
  };

  const finishNextTask: FinishModalContextType["finishNextTask"] = ({
    status,
    assigned_date,
  }) => {
    const nextTask = tasks[0];

    if (status && assigned_date) {
      // TODO
    } else if (status) {
      updateTaskStatus({ id: nextTask.id, status: status as any });
    } else if (assigned_date) {
      updateTaskAssignedDate({ id: nextTask.id, assigned_date });
    }

    /**
     * Remove first task from array
     */
    setTasks(tasks.slice(1));
  };

  const dismissFinishModal = () => {
    Animated.timing(colorAnimatedValue, {
      toValue: 0,
      duration: 640,
      useNativeDriver: false,
    }).start();
    setVisible(false);
  };

  return (
    <FinishModalContext.Provider
      value={{
        mode,
        visible,
        currentTask: tasks[0],
        tasks,
        dismissFinishModal,
        showFinishModal,
        finishNextTask,
      }}
    >
      <Animated.View
        style={{
          backgroundColor: colorAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [rgba(backgroundColor, 0), rgba(backgroundColor, 1)],
          }),
          flex: 1,
        }}
      >
        {children}
      </Animated.View>
    </FinishModalContext.Provider>
  );
};

export const useFinishModal = () => useContext(FinishModalContext);
