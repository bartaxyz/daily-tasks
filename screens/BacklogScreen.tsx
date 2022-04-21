import { useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "styled-components/native";
import { Button, Section, Task, Typography } from "../components";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { useData } from "../db/DataProvider";

export const BacklogScreen = () => {
  const [selected, setSelected] = useState("backlog");
  const { projects, backlogTasks, deletedTasks, deleteTask } = useData();
  const { colors } = useTheme();

  const onEmptyTrash = () => {
    const removeAllTasksFromTrash = () => {
      deletedTasks.forEach((task) => {
        deleteTask({ id: task.id });
      });

      setSelected("backlog");
    };

    if (Platform.OS === "web") {
      if (confirm("Do you wish to remove all tasks from the trash?")) {
        console.log("REMOVING");
        removeAllTasksFromTrash();
      }
    } else {
      Alert.alert("Do you wish to remove all tasks from the trash?", "", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: removeAllTasksFromTrash,
        },
      ]);
    }
  };

  const emptyBacklog = (
    <Section.Content
      inset="M"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <Path
          d="M14 7.73926C14.4307 7.73047 14.7822 7.37012 14.7822 6.88672V4.85645C14.7822 4.37305 14.4307 4.0127 14 4.0127C13.5693 4.0127 13.2178 4.37305 13.2178 4.85645V6.88672C13.2178 7.37012 13.5693 7.74805 14 7.73926ZM18.5352 9.62012C18.8428 9.91895 19.3525 9.91016 19.6953 9.57617L21.1279 8.13477C21.4795 7.79199 21.4707 7.29102 21.1631 6.9834C20.873 6.67578 20.3633 6.67578 20.0205 7.02734L18.5791 8.45996C18.2363 8.80273 18.2275 9.32129 18.5352 9.62012ZM9.45605 9.62012C9.76367 9.3125 9.75488 8.80273 9.4209 8.45996L7.97949 7.02734C7.63672 6.67578 7.13574 6.68457 6.82812 6.9834C6.52051 7.29102 6.52051 7.79199 6.86328 8.13477L8.30469 9.57617C8.64746 9.91016 9.15723 9.92773 9.45605 9.62012ZM5.78223 18.0752H23.5361C23.8789 18.0752 24.1426 17.8203 24.1426 17.4775C24.1426 17.1436 23.8789 16.8887 23.5361 16.8887H17.9199C18.4912 16.1152 18.8164 15.166 18.8164 14.1553C18.8164 11.501 16.6367 9.33008 14 9.33008C11.3633 9.33008 9.18359 11.501 9.18359 14.1553C9.18359 15.166 9.50879 16.1152 10.0801 16.8887H5.78223C5.44824 16.8887 5.18457 17.1436 5.18457 17.4775C5.18457 17.8203 5.44824 18.0752 5.78223 18.0752ZM10.7568 14.1553C10.7568 12.3711 12.2246 10.9121 14 10.9121C15.7754 10.9121 17.2344 12.3711 17.2344 14.1553C17.2344 15.3066 16.6191 16.3262 15.7051 16.8887H12.2949C11.3809 16.3262 10.7568 15.3066 10.7568 14.1553ZM4.70117 14.6738H6.73145C7.21484 14.6738 7.59277 14.3223 7.58398 13.8916C7.5752 13.4609 7.21484 13.1094 6.73145 13.1094H4.70117C4.21777 13.1094 3.85742 13.4609 3.85742 13.8916C3.85742 14.3223 4.22656 14.6738 4.70117 14.6738ZM21.2686 14.6738H23.2988C23.7822 14.6826 24.1426 14.3223 24.1426 13.8916C24.1426 13.4609 23.7822 13.1094 23.2988 13.1094H21.2686C20.7852 13.1094 20.4072 13.4609 20.416 13.8916C20.4248 14.3223 20.7852 14.6738 21.2686 14.6738ZM4.46387 21.4502H22.209C22.5518 21.4502 22.8154 21.1953 22.8154 20.8525C22.8154 20.5186 22.5518 20.2637 22.209 20.2637H4.46387C4.12109 20.2637 3.85742 20.5186 3.85742 20.8525C3.85742 21.1953 4.12109 21.4502 4.46387 21.4502ZM5.78223 24.8252H23.5361C23.8789 24.8252 24.1426 24.5703 24.1426 24.2275C24.1426 23.8936 23.8789 23.6387 23.5361 23.6387H5.78223C5.44824 23.6387 5.18457 23.8936 5.18457 24.2275C5.18457 24.5703 5.44824 24.8252 5.78223 24.8252Z"
          fill={colors.text.secondary}
        />
      </Svg>

      <Typography.Body
        color={colors.text.secondary}
        style={{ margin: 12 }}
        textAlign="center"
      >
        Your backlog is empty.
      </Typography.Body>
    </Section.Content>
  );

  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Sidebar>
        <Sidebar.Section>
          <Sidebar.Button
            icon="backlog"
            selected={selected === "backlog"}
            onPress={() => setSelected("backlog")}
          >
            Backlog
          </Sidebar.Button>

          {deletedTasks.length !== 0 && (
            <Sidebar.Button
              icon="trash"
              selected={selected === "trash"}
              onPress={() => setSelected("trash")}
            >
              Trash
            </Sidebar.Button>
          )}
        </Sidebar.Section>

        {projects.length !== 0 && (
          <Sidebar.Section>
            <Sidebar.Title>Projects</Sidebar.Title>

            {projects.map((project) => (
              <Sidebar.Button
                key={project.id}
                icon="folder"
                selected={selected === project.id}
                onPress={() => setSelected(project.id)}
              >
                {project.name}
              </Sidebar.Button>
            ))}
          </Sidebar.Section>
        )}

        {/** TODO: Implement project management */}
        {/* <View style={{ flex: 1 }} />

        <Section.Separator />

        <Section.Content inset="XS">
          <Button>Add Project</Button>
        </Section.Content> */}
      </Sidebar>
      <Section separator="none" style={{ flex: 2 }}>
        <Section.Content
          inset="S"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Title>
            {selected === "backlog"
              ? "Backlog"
              : selected === "trash"
              ? "Trash"
              : `${projects.find((project) => project.id === selected)?.name}`}
          </Typography.Title>

          {selected === "trash" && (
            <Button onPress={onEmptyTrash}>Empty Trash</Button>
          )}
        </Section.Content>

        <Section.Separator />
        {/* <TodayScreen /> */}

        {selected === "backlog" &&
          (backlogTasks.length === 0 ? (
            emptyBacklog
          ) : (
            <ScrollView>
              <Section.Content inset="S">
                {backlogTasks.map((task, index) => (
                  <Task key={task.id} editable={false}>
                    {task.body}
                  </Task>
                ))}
              </Section.Content>
            </ScrollView>
          ))}

        {selected === "trash" &&
          (deletedTasks.length === 0 ? (
            emptyBacklog
          ) : (
            <ScrollView>
              <Section.Content inset="S">
                {deletedTasks.map((task, index) => (
                  <Task key={task.id} editable={false}>
                    {task.body}
                  </Task>
                ))}
              </Section.Content>
            </ScrollView>
          ))}
      </Section>
    </View>
  );
};
