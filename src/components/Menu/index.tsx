import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from "lucide-react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

type AvailableTheme = "light" | "dark";

export function Menu() {
  const [theme, setTheme] = useState<AvailableTheme>(() => {
    const storedTheme =
      (localStorage.getItem("theme") as AvailableTheme) || "dark";
    return storedTheme;
  });

  const nextThemeIcon = theme === "dark" ? <SunIcon /> : <MoonIcon />;

  function handleThemeChange(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={styles.menu}>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Voltar para a página inicial"
        title="Home"
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ver histórico"
        title="Histórico"
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href="#"
        aria-label="Ver configurações"
        title="Configurações"
      >
        <SettingsIcon />
      </a>
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
