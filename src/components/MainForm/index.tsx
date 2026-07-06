import styles from "./styles.module.css";

import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { PlayCircleIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { TaskModel } from "../../models/TaskModels";

export function MainForm() {
  const taskNameInput = useRef<HTMLInputElement>(null);
  const { setState } = useTaskContext();

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
      duration: 1,
      type: "workTime",
    };

    const secondsRemaining = newTask.duration * 60; // Calcula o tempo restante em segundos com base na duração da tarefa

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config }, // Mantém a configuração existente
        activeTask: newTask, // Define a nova tarefa como a tarefa ativa
        currentCycle: 1, // Conferir se é necessário atualizar o ciclo atual ao criar uma nova tarefa
        secondsRemaining,
        formattedSecondsRemaining: "00:00", // Inicializa o tempo restante formatado como "00:00"
        tasks: [...prevState.tasks, newTask], // Adiciona a nova tarefa à lista de tarefas
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
          />
        </div>
        <div className="formRow">
          <p>
            Loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            voluptate.
          </p>
        </div>
        <div className="formRow">
          <Cycles />
        </div>
        <div className="formRow">
          <DefaultButton icon={<PlayCircleIcon />} />
        </div>
      </form>
    </>
  );
}
