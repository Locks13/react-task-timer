import { TaskModel } from "../models/TaskModel";

export function getTaskStatus(tasks: TaskModel, activeTask: TaskModel | null) {
  if (tasks.completeDate) return "Task concluida";
  if (tasks.interruptedDate) return "Task interrompida";
  if (tasks.id === activeTask?.id) return "Em progresso";
  return "Abandonada";
}
