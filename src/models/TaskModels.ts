import { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  tasks: string[];
  name: string;
  duration: number;
  startDate: number;
  completeDate: number | null;
  intrruptedDate: number | null;
  type: keyof TaskStateModel["config"];
};
