import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../util/getNextCycle";
import { getNextCycleType } from "../../util/getNextCycleType";
import styles from "./styles.module.css";

export function Cycles() {
  const { state } = useTaskContext();

  const cycleDots = Array.from({ length: state.currentCycle });

  const cycleDescriptionMap = {
    workTime: "Indicador de ciclo de foco",
    shortBreakTime: "Indicador de Pausa curta",
    longBreakTime: "Indicador de Pausa longa",
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleDots.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={`${nextCycle}-${nextCycleType}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              title={cycleDescriptionMap[nextCycleType]}
              aria-label={cycleDescriptionMap[nextCycleType]}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
