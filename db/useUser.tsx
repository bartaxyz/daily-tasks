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

  const insertTaskToOrderBeforeAfter = async (
    taskId: string,
    {
      before,
      after,
    }: {
      before?: string;
      after?: string;
    }
  ) => {
    if (!user || !userData) return;

    if (before) {
      const index = userData.today_order.findIndex(
        (taskId) => taskId === before
      );

      if (index === -1) return;

      const newOrder = [
        ...userData.today_order.slice(0, index),
        taskId,
        ...userData.today_order.slice(index + 1),
      ];

      return setTodayOrder(newOrder);
    }

    if (after) {
      const index = userData.today_order.findIndex(
        (taskId) => taskId === after
      );

      if (index === -1) return;

      const newOrder = [
        ...userData.today_order.slice(0, index + 1),
        taskId,
        ...userData.today_order.slice(index + 1),
      ];

      return setTodayOrder(newOrder);
    }
  };

  /**
   * @deprecated Please use `insertTaskToOrderBeforeAfter` instead for more
   * consistent results.
   */
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

  const moveTaskInOrderBeforeAfter = async (
    taskId: string,
    {
      before,
      after,
    }: {
      before?: string;
      after?: string;
    }
  ) => {
    if (!user || !userData) return;

    const todayOrder = userData.today_order;

    const index = !!before
      ? todayOrder.findIndex((taskId) => taskId === before)
      : todayOrder.findIndex((taskId) => taskId === after);

    if (index === -1) return;

    return moveTaskInOrder(taskId, index);
  };

  /**
   * @deprecated Please use `moveTaskInOrderBeforeAfter` instead for more
   * consistent results.
   */
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
    insertTaskToOrderBeforeAfter,
    insertTaskToOrder,
    moveTaskInOrderBeforeAfter,
    moveTaskInOrder,
  };
};
