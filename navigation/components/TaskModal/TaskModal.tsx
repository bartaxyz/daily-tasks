import { rgba } from "polished";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Platform, View } from "react-native";
import { Portal } from "react-native-paper";
import { useTheme } from "styled-components/native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { Checkbox, Section } from "../../../components";
import { useTaskModal } from "./TaskModalProvider";
import { FinishModalBackdrop } from "../FinishModal/FinishModalBackdrop";

export interface TaskModalProps {
  onDismiss: () => void;
}

export const TaskModal = () => {
  const { colors } = useTheme();
  const { mode, task, visible, currentTask, dismissTaskModal } = useTaskModal();

  console.log({ visible });

  const bottomSheetRef = useRef<BottomSheet>(null);

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
      dismissTaskModal();
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
        <View>
          <Section separator="none" style={{ flex: 1 }}>
            <Section.Content inset="S">
              <Checkbox checked={task.status === "done"} onChange={() => {}} />
              <BottomSheetTextInput value={task.body} />
            </Section.Content>
          </Section>
        </View>

        {/* <TaskModalActions
          mode={mode}
          onBacklogPress={onBacklogPress}
          onTodayTomorrowPress={onTodayTomorrowPress}
          onTrashPress={onTrashPress}
        /> */}

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
