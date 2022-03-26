import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { useAuth } from "./useAuth";
import { TaskData } from "./types";

export const useTasks = (): { tasks: TaskData[] } => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskData[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "tasks"),
      where("owned_by", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks: TaskData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as TaskData;
        tasks.push({
          ...data,
          id: data.id,
        });
      });

      setTasks(tasks);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return { tasks };
};
