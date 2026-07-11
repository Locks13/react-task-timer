import { createContext } from "react";
import { TaskStateModel } from "../../models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";
import { TaskActionModel } from "./taskActions";

export type ThemeType = "light" | "dark";

type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
  theme: ThemeType;
  toggleTheme: () => void;
  getToastTheme: () => ThemeType;
};

const initialContextValue = {
  state: initialTaskState,
  dispatch: () => {},
  theme: "dark" as ThemeType,
  toggleTheme: () => {},
  getToastTheme: (): ThemeType => "light",
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);
