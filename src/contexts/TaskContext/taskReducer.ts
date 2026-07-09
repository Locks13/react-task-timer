import { TaskStateModel } from "../../models/TaskStateModel";
import { formatSecondsToMinutes } from "../../util/formatSecondsToMinutes";
import { getNextCycle } from "../../util/getNextCycle";
import { TaskActionModel, TaskActionTypes } from "./taskActions";

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60; // Converte a duração da tarefa de minutos para segundos

      return {
        ...state,
        activeTask: newTask, // Define a nova tarefa como a tarefa ativa
        currentCycle: nextCycle, // Atualiza o ciclo atual ao criar uma nova tarefa
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining), // Inicializa o tempo restante formatado como "00:00"
        tasks: [...state.tasks, action.payload],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        config: { ...state.config }, // Mantém a configuração existente
        activeTask: null, // Define a tarefa como Null, indicando que não há tarefa ativa
        secondsRemaining: 0, // Reseta o tempo restante para "00:00"
        formattedSecondsRemaining: "00:00", // Reseta o tempo restante formatado para "00:00"
        tasks: state.tasks.map((task) => {
          if (task.id === state.activeTask?.id) {
            return {
              ...task,
              interruptedDate: Date.now(), // Define a data de interrupção da tarefa
            };
          }
          return task;
        }), // Atualiza a lista de tarefas, marcando a tarefa ativa como interrompida
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: "00:00",
        tasks: state.tasks.map((task) => {
          if (state.activeTask && state.activeTask.id === task.id) {
            return { ...task, completeDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload.secondsRemaining,
        ),
      };
    }
    case TaskActionTypes.RESET_STATE: {
      return state;
    }
  }
  return state;
}
