import React, { forwardRef } from "react";
import styles from "./styles.module.css";

type DefaultInputProps = {
  id: string;
  labelText: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  ({ id, labelText, type, ...rest }, ref) => {
    return (
      <>
        {labelText && <label htmlFor={id}>{labelText}</label>}
        <input
          className={styles.input}
          type={type}
          id={id}
          ref={ref}
          {...rest}
        />
      </>
    );
  },
);
