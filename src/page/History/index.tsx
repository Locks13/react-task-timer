import styles from "./styles.module.css";

import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { TrashIcon } from "lucide-react";
import { Heading } from "../../components/Heading";

export function History() {
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>
            <h1>History</h1>
          </span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="secondary-button"
              aria-label="Apagar todo o histórico"
              title="Apagar histórico"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className="responsiveTable">jfidjigjgj</div>
      </Container>
    </MainTemplate>
  );
}
