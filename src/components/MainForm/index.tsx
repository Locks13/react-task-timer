import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskModel } from "../../models/TaskModel";
import { getNextCycle } from "../../util/getNextCycle";
import { getNextCycleType } from "../../util/getNextCycleType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { messagesToastify } from "../../adapters/messagesToastify";

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle); // Exemplo de uso da função getNextCycle
  const nextCycleType = getNextCycleType(nextCycle); // Exemplo de uso da função getNextCycleType
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name || "";

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    messagesToastify.dismiss();

    if (taskNameInput.current === null) {
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      messagesToastify.warning("Digite o nome da tarefa.");
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      duration: [state.config[nextCycleType]], // Obtém a duração da tarefa com base no tipo de ciclo
      type: nextCycleType, // Obtém o tipo de ciclo com base no próximo ciclo
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    messagesToastify.success("Tarefa Iniciada");
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
    messagesToastify.dismiss();
    messagesToastify.error("Tarefa Interrompida");
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className="form" action="">
        <div className="formRow">
          <DefaultInput
            labelText="Task"
            id="taskInput"
            type="text"
            title="Teste"
            ref={taskNameInput}
            disabled={!!state.activeTask}
            defaultValue={lastTaskName}
          />
        </div>
        <div className="formRow">
          <Tips />
        </div>

        {state.currentCycle > 0 && (
          <div className="formRow">
            <Cycles />
          </div>
        )}
        <div className="formRow">
          {!state.activeTask ? (
            <DefaultButton
              aria-label="Iniciar nova tarefa"
              title="Iniciar nova tarefa"
              type="submit"
              icon={<PlayCircleIcon />}
            />
          ) : (
            <DefaultButton
              aria-label="Interromper tarefa"
              title="Interromper tarefa"
              type="button"
              icon={<StopCircleIcon />}
              color={"secondary-button"}
              onClick={handleInterruptTask}
            />
          )}
        </div>
      </form>
    </>
  );
}
