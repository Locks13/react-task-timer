import styles from "./styles.module.css";

import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskModel } from "../../models/TaskModels";
import { getNextCycle } from "../../util/getNextCycle";
import { getNextCycleType } from "../../util/getNextCycleType";
import { formatSecondsToMinutes } from "../../util/formatSecondsToMinutes";

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const { state, setState } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle); // Exemplo de uso da função getNextCycle
  const nextCycleType = getNextCycleType(nextCycle); // Exemplo de uso da função getNextCycleType

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) {
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert("Digite o nome da tarefa.");
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

    const secondsRemaining = newTask.duration * 60; // Calcula o tempo restante em segundos com base na duração da tarefa

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config }, // Mantém a configuração existente
        activeTask: newTask, // Define a nova tarefa como a tarefa ativa
        currentCycle: nextCycle, // Atualiza o ciclo atual ao criar uma nova tarefa
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining), // Inicializa o tempo restante formatado como "00:00"
        tasks: [...prevState.tasks, newTask], // Adiciona a nova tarefa à lista de tarefas
      };
    });
  }

  function handleInterruptTask(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config }, // Mantém a configuração existente
        activeTask: null, // Define a tarefa como Null, indicando que não há tarefa ativa
        secondsRemaining: "00:00", // Reseta o tempo restante para "00:00"
        formattedSecondsRemaining: "00:00", // Reseta o tempo restante formatado para "00:00"
      };
    });
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
          />
        </div>
        <div className="formRow">
          <p>Proximo ciclo é de 15min.</p>
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
