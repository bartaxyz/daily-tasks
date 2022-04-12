import { Timestamp } from "firebase/firestore";
import { TaskData } from "../../../db/types";
import { getAssignedDateOfIndex } from "../getAssignedDateOfIndex";

const mockInput: Partial<TaskData>[] = [
  {
    assigned_date: Timestamp.fromDate(new Date(1577836800000)),
  },
  /**
   * Here gets inserted index 1
   */
  {
    assigned_date: Timestamp.fromDate(new Date(1577923200000)),
  },
  {
    assigned_date: Timestamp.fromDate(new Date(1578009600000)),
  },
  {
    assigned_date: Timestamp.fromDate(new Date(1578096000000)),
  },
  {
    assigned_date: Timestamp.fromDate(new Date(1578182400000)),
  },
];

/** Test */
describe("getAssignedDateOfIndex", () => {
  it("gets assigned a date between 0 & 1 items", () => {
    const result = getAssignedDateOfIndex(mockInput as TaskData[], 1);

    expect(result.toDate()).toEqual(new Date(1577966400000));
  });
});
