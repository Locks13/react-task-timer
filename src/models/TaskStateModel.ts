import { TaskModel } from "./TaskModels";

export type TaskStateModel = {
  currentTask: TaskModel[];
  sencondsRemaining: number;
  formatedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
