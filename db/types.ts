export interface TaskData {
  id: string;
  assigned_date: {
    nanoseconds: number;
    seconds: number;
  };
  body: string;
  owned_by: string;
  status: "none" | "done" | "error";
}
