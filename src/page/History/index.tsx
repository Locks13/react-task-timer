import styles from "./styles.module.css";

import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { TrashIcon } from "lucide-react";
import { Heading } from "../../components/Heading";

import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../util/formatDate";
import { getTaskStatus } from "../../util/getTaskStatus";
import { sortTasks, SortTasksOptions } from "../../util/sortTasks";
import { useEffect, useState } from "react";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { messagesToastify } from "../../adapters/messagesToastify";

export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTask = state.tasks.length > 0;

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    },
  );

  useEffect(() => {
    setSortTaskOptions((prevState) => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  function handleResetHistory() {
    messagesToastify.dismiss();
    messagesToastify.confirm("Tem certeza?", (confirmation) => {
      setConfirmClearHistory(confirmation);
    });
  }

  useEffect(() => {
    return () => {
      messagesToastify.dismiss();
      console.log("Cheguei aqui");
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTasksOptions.direction === "desc" ? "asc" : "desc";

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span className={styles.title}>
            <h1>History</h1>
          </span>
          {hasTask && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="secondary-button"
                aria-label="Apagar todo o histórico"
                title="Apagar histórico"
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTask && (
          <div className="responsiveTable">
            <div className={styles.responsiveTable}>
              <table>
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSortTasks({ field: "name" })}
                      className={styles.thSort}
                    >
                      Tarefa ↕
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "duration" })}
                      className={styles.thSort}
                    >
                      Duração ↕
                    </th>
                    <th
                      onClick={() => handleSortTasks({ field: "startDate" })}
                      className={styles.thSort}
                    >
                      Data ↕
                    </th>
                    <th>Status</th>
                    <th>Tipo</th>
                  </tr>
                </thead>

                <tbody>
                  {sortTasksOptions.tasks.map((task) => {
                    const taskDictionary = {
                      workTime: "Foco",
                      shortBreakTime: "Descanso curto",
                      longBreakTime: "Descanso Longo",
                    };
                    return (
                      <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.duration}min</td>
                        <td>{formatDate(task.startDate)}</td>
                        <td>{getTaskStatus(task, state.activeTask)}</td>
                        <td>{taskDictionary[task.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {!hasTask && (
          <div className={styles.hasNotask}>
            <p className={styles.noTask}>Sem tarefas.</p>
          </div>
        )}
      </Container>
    </MainTemplate>
  );
}
