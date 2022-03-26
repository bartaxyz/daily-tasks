import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  doc,
  Timestamp,
  addDoc,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { useAuth } from "./useAuth";
import { TaskData } from "./types";

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [tasksSynced, setTasksSynced] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "tasks"),
      where("owned_by", "==", user.uid),
      orderBy("assigned_date", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks: TaskData[] = [];

      console.log({querySnapshot});

      setTasksSynced(!querySnapshot.metadata.fromCache);

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        const data = doc.data() as TaskData;
        tasks.push({
          ...data,
          id: doc.id,
        });
      });

      setTasks(tasks);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const createTask = async ({ body }: Pick<TaskData, "body">) => {
    if (!user) return;

    await addDoc(collection(firestore, "tasks"), {
      body,
      assigned_date: Timestamp.now(),
      owned_by: user.uid,
      status: "none",
    });
  };

  const updateTaskBody = async ({
    id,
    body,
  }: Pick<TaskData, "id" | "body">) => {
    if (!user) return;

    await setDoc(
      doc(firestore, "tasks", id),
      {
        body,
      },
      { merge: true }
    );
  };

  const updateTaskStatus = async ({
    id,
    status,
  }: Pick<TaskData, "id" | "status">) => {
    await setDoc(
      doc(firestore, "tasks", id),
      {
        status,
      },
      { merge: true }
    );
  };

  return { tasks, createTask, updateTaskBody, updateTaskStatus, tasksSynced };
};
