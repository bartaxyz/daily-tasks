import { Timestamp } from "firebase/firestore";

export interface UserData {
  id: string;
  today_order: string[];
}

export interface TaskData {
  id: string;
  assigned_date: Timestamp;
  body: string;
  owned_by: string;
  status: "none" | "done" | "error" | "deleted" | "backlog";
}

export interface ProjectData {
  id: string;
  name: string;
  owned_by: string;
  order: string[];
}
