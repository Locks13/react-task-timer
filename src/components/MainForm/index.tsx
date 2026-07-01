import styles from "./styles.module.css";

import { DefaultInput } from "../DefaultInput";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { PlayCircleIcon } from "lucide-react";

type MainTampleteProps = {
  children?: React.ReactNode;
  onSubmit: (data: any) => void;
};

export function MainForm() {
  return (
    <>
      <form className="form" action="">
        <div className="formRow">
          <DefaultInput
            labelText="Task"
            id="taskInput"
            type="text"
            title="Teste"
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
