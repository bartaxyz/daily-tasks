import { endOfToday, startOfToday } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { TaskData } from "../../db/types";

export const getAssignedDateOfIndex = (tasks: TaskData[], index: number) => {
  let assignedDate = 0;

  let start = 0;
  let end = 0;

  if (index === 0) {
    start = +startOfToday();
    end = tasks[index + 1].assigned_date.toMillis();
  } else if (index === tasks.length - 1) {
    start = tasks[index].assigned_date.toMillis();
    end = +endOfToday();
  } else {
    start = tasks[index].assigned_date.toMillis();
    end = tasks[index + 1].assigned_date.toMillis();
  }

  const delta = (end - start) / 2;
  assignedDate = start + delta;

  console.log({ start, end, assignedDate });

  return Timestamp.fromMillis(assignedDate);
};
