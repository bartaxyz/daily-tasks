import React from "react";
import { View } from "react-native";
import { Button, Section, Task, Typography } from "../../components";
import { TaskList } from "../../components/TaskList";
import { useData } from "../../db/DataProvider";
import { useFinishModal } from "./FinishModal/FinishProvider";

export interface OverdueSectionProps {}

const displayItemCount = 2;

export const OverdueSection: React.FC<OverdueSectionProps> = () => {
  const { overdueTasks } = useData();
  const { showFinishModal } = useFinishModal();

  return (
    <Section.Content inset="S">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 12,
        }}
      >
        <Typography.Title>Overdue</Typography.Title>
        <Button
          variant="primary"
          onPress={() => {
            showFinishModal({
              mode: "overdue",
              tasks: overdueTasks,
            });
          }}
        >
          Finish Overdue
        </Button>
      </View>

      <View style={{ opacity: 0.5 }}>
        {/**
         * In order to have smoother animation,we keep
         * one invisible task here as a placeholder
         */}
        {overdueTasks.length === 0 && (
          <View style={{ opacity: 0 }}>
            <Task id="" context="today" editable={false}>
              &nbsp;
            </Task>
          </View>
        )}

        <TaskList
          tasks={overdueTasks}
          limit={displayItemCount}
          context="overdue"
        />
      </View>
    </Section.Content>
  );
};
