import { Timestamp } from "firebase/firestore";

export interface TaskData {
  id: string;
  assigned_date: Timestamp;
  body: string;
  owned_by: string;
  status: "none" | "done" | "error";
  displayed_after: string;
}
