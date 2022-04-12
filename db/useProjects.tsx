import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { useAuth } from "./useAuth";
import { ProjectData } from "./types";

export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectsSynced, setProjectsSynced] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(firestore, "projects"),
      where("owned_by", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projects: ProjectData[] = [];

      setProjectsSynced(!querySnapshot.metadata.hasPendingWrites);

      querySnapshot.forEach((doc) => {
        const data = doc.data() as ProjectData;
        projects.push({
          ...data,
          id: doc.id,
        });
      });

      setProjects(projects);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  /*   const createTask = async ({
    body = "",
    assigned_date,
  }: Partial<ProjectData>) => {
    if (!user) return;

    await addDoc(collection(firestore, "tasks"), {
      body,
      assigned_date: assigned_date ?? Timestamp.now(),
      owned_by: user.uid,
      status: "none",
    });
  }; */

  return {
    projects,
    projectsSynced,
  };
};
