import { addDays } from "date-fns";
import { deleteField, Timestamp } from "firebase/firestore";
import { rgba } from "polished";
import { createContext, useContext, useEffect, useState } from "react";
import { Animated, Platform, View } from "react-native";
import { Modal } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { Button, Section, Task, Typography } from "../../components";
import { IconButton } from "../../components/IconButton";
import { TaskData } from "../../db/types";
import { useTasks } from "../../db/useTasks";

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

export interface FinishModalProps {
  onDismiss: () => void;
}

export const FinishModal = () => {
  const { name, colors } = useTheme();
  const {
    mode,
    visible,
    tasks,
    currentTask,
    dismissFinishModal,
    finishNextTask,
  } = useFinishModal();

  const [animatedValue] = useState(new Animated.Value(0));

  const animationDuration = 200;

  const triggerChange = (callback: () => void) => {
    /**
     * On last item, there's no animation, we just dismiss the modal
     */
    if (tasks.length === 1) {
      dismissFinishModal();
      setTimeout(callback, animationDuration);
      return;
    }

    Animated.timing(animatedValue, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();

    setTimeout(callback, animationDuration);
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: false,
    }).start();
  }, [currentTask]);

  const onBacklogPress = () => {
    triggerChange(() => {
      finishNextTask({ status: "backlog", assigned_date: null as any });
    });
  };

  const onTodayTomorrowPress = () => {
    if (mode === "overdue") {
      triggerChange(() => {
        finishNextTask({ assigned_date: Timestamp.now() });
      });
    } else {
      triggerChange(() => {
        finishNextTask({
          assigned_date: Timestamp.fromDate(addDays(new Date(), 1)),
        });
      });
    }
  };

  const onTrashPress = () => {
    triggerChange(() => {
      finishNextTask({ status: "deleted" });
    });
  };

  return (
    <Modal
      visible={visible}
      onDismiss={dismissFinishModal}
      contentContainerStyle={{
        backgroundColor: rgba(
          colors.background.default,
          name === "dark" ? 0.1 : 0.75
        ),
        borderRadius: 10,
        maxWidth: 320,
        margin: "auto",
        borderWidth: 1,
        borderColor: colors.section.separator,
        shadowRadius: 36,
        ...(Platform.select({
          web: { backdropFilter: "blur(40px)" },
          default: {},
        }) as any),
      }}
    >
      <Section.Content inset="XS">
        <Typography.Title
          textAlign="center"
          style={{ marginTop: 24, marginBottom: 12 }}
        >
          Let's sort all your {mode === "overdue" ? "overdue" : "todays"} tasks
        </Typography.Title>
        <Typography.Caption textAlign="center" color={colors.text.secondary}>
          One by one, to make it simple and efficient
        </Typography.Caption>
      </Section.Content>

      <Animated.View
        style={{
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}
      >
        <Section separator="around">
          <Section.Content inset="XS">
            <Task status="none">{currentTask?.body}</Task>
          </Section.Content>

          <Section.Separator />

          <Section.Content inset="XS">
            <Typography.Caption
              textAlign="center"
              color={colors.text.secondary}
              style={{
                margin: 8,
              }}
            >
              Where should this task go?
            </Typography.Caption>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <IconButton
                label="Backlog"
                icon="archive"
                onPress={onBacklogPress}
              />

              <View style={{ marginLeft: 8, marginRight: 8 }}>
                <IconButton
                  label={mode === "overdue" ? "Today" : "Tomorrow"}
                  icon="sunset"
                  onPress={onTodayTomorrowPress}
                />
              </View>

              <IconButton label="Trash" icon="trash" onPress={onTrashPress} />
            </View>
          </Section.Content>
        </Section>
      </Animated.View>
    </Modal>
  );
};
