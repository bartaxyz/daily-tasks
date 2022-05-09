import { addDays } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { rgba } from "polished";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Platform, ScrollView, View } from "react-native";
import { Portal } from "react-native-paper";
import { useTheme } from "styled-components/native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { Section, Task, Typography } from "../../../components";
import { useFinishModal } from "./FinishProvider";
import { FinishModalBackdrop } from "./FinishModalBackdrop";
import { FinishModalActions } from "./FinishModalActions";

export interface FinishModalProps {
  onDismiss: () => void;
}

export const FinishModal = () => {
  const { colors } = useTheme();
  const {
    mode,
    visible,
    tasks,
    currentTask,
    dismissFinishModal,
    finishNextTask,
  } = useFinishModal();

  const bottomSheetRef = useRef<BottomSheet>(null);

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

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  const snapPoints = useMemo(() => [480], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      dismissFinishModal();
    }
  }, []);

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        style={{
          backgroundColor: Platform.select({
            ios: rgba(colors.background.default, 0.5),
            default: rgba(colors.background.default, 1),
          }),
          shadowColor: rgba(colors.text.default, 0.05),
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 10,
          borderRadius: 16,
          overflow: "hidden",
        }}
        backgroundComponent={BlurView}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={FinishModalBackdrop}
      >
        <Section.Content inset="M">
          <Typography.Title
            textAlign="center"
            style={{ marginTop: 24, marginBottom: 12 }}
          >
            Let's sort all your {mode === "overdue" ? "overdue" : "todays"}{" "}
            tasks
          </Typography.Title>
          <Typography.Caption textAlign="center" color={colors.text.secondary}>
            One by one, to make it simple and efficient
          </Typography.Caption>
        </Section.Content>

        <Section separator="around" style={{ flex: 1 }}>
          <BottomSheetScrollView
            alwaysBounceVertical={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View
              style={{
                marginVertical: 8,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Task id={currentTask?.id!} context="none" variant="inactive">
                {currentTask?.body}
              </Task>
            </View>
          </BottomSheetScrollView>
        </Section>

        <FinishModalActions
          mode={mode}
          onBacklogPress={onBacklogPress}
          onTodayTomorrowPress={onTodayTomorrowPress}
          onTrashPress={onTrashPress}
        />

        {/** iOS navigation bar height */}
        <View
          style={{
            height: Platform.OS === "ios" ? 44 : 0,
          }}
        />
      </BottomSheet>
    </Portal>
  );
};
