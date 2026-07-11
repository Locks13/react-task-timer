import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { DefaultInput } from "../../components/DefaultInput";
import { DefaultButton } from "../../components/DefaultButton";
import { SaveIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { messagesToastify } from "../../adapters/messagesToastify";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function handleSaveConfig(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    messagesToastify.dismiss();

    const formErros = [];

    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErros.push("Por favor use apenas numeros no campos");
    }

    if (workTime < 1 || workTime > 99) {
      formErros.push("Apenas numeros entre 1 e 99 para Foco");
    }
    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErros.push("Apenas numeros entre 1 e 30 para Descanso Curto");
    }
    if (longBreakTime < 1 || longBreakTime > 60) {
      formErros.push("Apenas numeros entre 1 e 60 para Descanso Long");
    }
    if (formErros.length > 0) {
      formErros.forEach((error) => {
        messagesToastify.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    messagesToastify.success("Alterações salvas");
  }
  return (
    <>
      <MainTemplate>
        <Container>
          <Heading>
            <h1>Configurações</h1>
          </Heading>
        </Container>

        <Container>
          <form onSubmit={handleSaveConfig} action="" className="form">
            <div className="formRow">
              <DefaultInput
                id="workTime"
                labelText="Foco"
                ref={workTimeInputRef}
                defaultValue={state.config.workTime}
                type="number"
              />
            </div>
            <div className="formRow">
              <DefaultInput
                id="shortBrakeTime"
                labelText="Descanso curto"
                ref={shortBreakTimeInputRef}
                defaultValue={state.config.shortBreakTime}
                type="number"
              />
            </div>
            <div className="formRow">
              <DefaultInput
                id="longBrakeTime"
                labelText="Descanso Longo"
                ref={longBreakTimeInputRef}
                defaultValue={state.config.longBreakTime}
                type="number"
              />
            </div>
            <div className="formRow">
              <DefaultButton
                icon={<SaveIcon />}
                color="primary-button"
                aria-label="Salvar configurações"
                title="Salvar configurações"
              />
            </div>
          </form>
        </Container>
      </MainTemplate>
    </>
  );
}
