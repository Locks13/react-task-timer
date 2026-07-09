import { taskModel } from "../../models/TaskModel";

export enum TaskActionTypes {
  START_TASK = "START_TASK",
  INTERRUPT_TASK = "INTERRUPT_TASK",
  RESET_TASK = "RESET_TASK",
}

export type TaskActionModelWithPayload =
  | {
      type: TaskActionTypes.START_TASK;
      payload: taskModel;
    }
  | {
      type: TaskActionTypes.INTERRUPT_TASK;
      payload: taskModel;
    };

export type TaskActionModelWithoutPayload = {
  type: TaskActionTypes.RESET_TASK;
};

export type TaskActionModel =
  | TaskActionModelWithPayload
  | TaskActionModelWithoutPayload;
