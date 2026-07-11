import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useContext } from "react";
import { RouterLink } from "../RouterLink";
import { TaskContext } from "../../contexts/TaskContext/TaskContext";

export function Menu() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("Menu must be used within TaskContextProvider");
  }

  const { theme, toggleTheme } = context;
  const nextThemeIcon = theme === "dark" ? <SunIcon /> : <MoonIcon />;

  function handleThemeChange(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    toggleTheme();
  }

  return (
    <div className={styles.menu}>
      <RouterLink
        className={styles.menuLink}
        href="/"
        aria-label="Voltar para a página inicial"
        title="Home"
      >
        <HouseIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/history"
        aria-label="Ver histórico"
        title="Histórico"
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        className={styles.menuLink}
        href="/settings"
        aria-label="Ver configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </RouterLink>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Escolher tema"
        title="Tema"
        onClick={handleThemeChange}
      >
        {nextThemeIcon}
      </a>
    </div>
  );
}
