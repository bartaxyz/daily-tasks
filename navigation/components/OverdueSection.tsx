import React from "react";
import { Platform, View } from "react-native";
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
    <React.Fragment>
      <Section.Content
        inset="S"
        style={{
          paddingBottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
      </Section.Content>

      <View style={{ opacity: 0.5 }}>
        <TaskList
          tasks={overdueTasks}
          limit={displayItemCount}
          context="overdue"
        />
      </View>
    </React.Fragment>
  );
};
