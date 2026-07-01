import React from "react";
import styles from "./styles.module.css";

type DefaultButtonProps = {
  icon: React.ReactNode;
  color?: "primary-button" | "secondary-button";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function DefaultButton({
  icon,
  color = "primary-button",
  ...props
}: DefaultButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
