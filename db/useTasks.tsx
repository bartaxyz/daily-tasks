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
  deleteDoc,
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
      where("owned_by", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks: TaskData[] = [];

      setTasksSynced(!querySnapshot.metadata.hasPendingWrites);

      querySnapshot.forEach((doc) => {
        const data = doc.data() as TaskData;
        tasks.push({
          ...data,
          id: doc.id,
        });
      });

      setTasks(
        tasks.sort((a, b) => a.assigned_date.seconds - b.assigned_date.seconds)
      );
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const createTask = async ({ body = "" }: Partial<TaskData>) => {
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

  const updateTaskAssignedDate = async ({
    id,
    assigned_date,
  }: Pick<TaskData, "id" | "assigned_date">) => {
    await setDoc(
      doc(firestore, "tasks", id),
      {
        assigned_date: assigned_date,
      },
      { merge: true }
    );
  };

  const deleteTask = async ({ id }: Pick<TaskData, "id">) => {
    await deleteDoc(doc(firestore, "tasks", id));
  };

  return {
    tasks,
    tasksSynced,
    createTask,
    updateTaskBody,
    updateTaskStatus,
    updateTaskAssignedDate,
    deleteTask,
  };
};
