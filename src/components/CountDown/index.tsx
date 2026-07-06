import { useTaskContext } from "../../contexts/TaskContext";
import styles from "./styles.module.css";

export function CountDown() {
  const taskContext = useTaskContext();
  console.log(taskContext);
  return <div className={styles.countdown}>00:00</div>;
}
