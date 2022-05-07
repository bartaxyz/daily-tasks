import { addDays } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { rgba } from "polished";
import { useEffect, useState } from "react";
import { Animated, Platform, View } from "react-native";
import { Modal } from "react-native-paper";
import { useTheme } from "styled-components/native";
import { IconButton } from "../../../components/IconButton";
import { Section, Task, Typography } from "../../../components";
import { useFinishModal } from "./FinishProvider";
import { FinishModalActions } from "./FinishModalActions";

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
        borderRadius: 10,
        margin: "auto",
        borderWidth: 1,
        borderColor: colors.section.separator,
        shadowRadius: 36,
        backgroundColor: colors.background.default,
        ...(Platform.select({
          web: {
            maxWidth: 320,
            backgroundColor: rgba(
              colors.background.default,
              name === "dark" ? 0.1 : 0.75
            ),
            backdropFilter: "blur(40px)",
          },
          android: {
            borderRadius: 28,
            borderWidth: 0,
            elevation: 24,
            maxWidth: 400,
            minWidth: 280,
            marginLeft: "auto",
            marginRight: "auto",
          },
          default: {
            maxWidth: 400,
            minWidth: 320,
            marginLeft: "auto",
            marginRight: "auto",
          },
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
            <Task
              id={currentTask?.id!}
              context="none"
              status="none"
              editable={false}
            >
              {currentTask?.body}
            </Task>
          </Section.Content>

          <Section.Separator />

          <FinishModalActions
            mode={mode}
            onBacklogPress={onBacklogPress}
            onTodayTomorrowPress={onTodayTomorrowPress}
            onTrashPress={onTrashPress}
          />
        </Section>
      </Animated.View>
    </Modal>
  );
};
