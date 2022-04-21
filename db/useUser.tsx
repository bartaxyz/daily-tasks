import { useEffect, useState } from "react";
import { onSnapshot, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useAuth } from "./useAuth";
import { UserData } from "./types";

export const useUser = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData>();
  const [userDataSynced, setUserDataSynced] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
      setUserDataSynced(!doc.metadata.hasPendingWrites);

      setLoading(false);

      const data = doc.data() as UserData;
      const userData: UserData = {
        ...data,
        id: doc.id,
      };

      setUserData(userData);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  /*   const removeTaskFromOrder = async (taskId: string) => {
    if (!user || !userData) return;

    const todayOrder = userData.today_order;

    const userData = {
      ...userData,
      order: userData.order.filter((taskId) => taskId !== taskId),
    };

    return setTodayOrder(userData);
  }; */

  const insertTaskToOrder = async (taskId: string, index: number) => {
    if (!user || !userData) return;

    /** add task to index */
    const todayOrder = userData.today_order;
    const newTodayOrder = [...todayOrder];
    newTodayOrder.splice(index, 0, taskId);

    return setTodayOrder(newTodayOrder);
  };

  const setTodayOrder = async (todayOrder: string[]) => {
    if (!user) return;

    await setDoc(doc(firestore, "users", user.uid), {
      today_order: todayOrder,
    });
  };

  const moveTaskInOrder = async (taskId: string, index: number) => {
    if (!user || !userData) return;

    const todayOrder = userData.today_order;

    /** Move task to new index */
    const newTodayOrder = [...todayOrder];
    newTodayOrder.splice(
      index,
      0,
      newTodayOrder.splice(todayOrder.indexOf(taskId), 1)[0]
    );

    return setTodayOrder(newTodayOrder);
  };

  return {
    loading,
    userData,
    userDataSynced,
    setTodayOrder,
    insertTaskToOrder,
    moveTaskInOrder,
  };
};
