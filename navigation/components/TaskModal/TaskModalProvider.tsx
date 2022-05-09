import { rgba } from "polished";
import { createContext, useContext, useState } from "react";
import { Animated } from "react-native";
import { useTheme } from "styled-components/native";
import { TaskData } from "../../../db/types";

interface TaskType {
  id: TaskData["id"];
  body: TaskData["body"];
  status: TaskData["status"];
}

interface TaskModalContextType {
  task: TaskType;
  mode: "overdue" | "today";
  visible: boolean;
  currentTask?: TaskData;
  dismissTaskModal: () => void;
  showTaskModal: (_: { task: TaskType; mode?: "overdue" | "today" }) => void;
}

const emptyTask: TaskType = {
  id: "",
  body: "",
  status: "none",
};

const TaskModalContext = createContext<TaskModalContextType>({
  task: emptyTask,
  mode: "overdue",
  visible: false,
  dismissTaskModal: () => {},
  showTaskModal: () => {},
});

export const TaskModalProvider: React.FC = ({ children }) => {
  const [task, setTask] = useState<TaskType>(emptyTask);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<TaskModalContextType["mode"]>("overdue");

  const showTaskModal: TaskModalContextType["showTaskModal"] = ({
    task,
    mode = "today",
  }) => {
    setVisible(true);
    setMode(mode);

    setTask(task);
  };

  const dismissTaskModal = () => {
    setVisible(false);
  };

  return (
    <TaskModalContext.Provider
      value={{
        task,
        mode,
        visible,
        dismissTaskModal,
        showTaskModal,
      }}
    >
      {children}
    </TaskModalContext.Provider>
  );
};

export const useTaskModal = () => useContext(TaskModalContext);
