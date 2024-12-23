import React, { ChangeEventHandler } from "react";
import styles from "./InputBox.module.css";

interface InputBoxProps {
    type?: "input" | "textarea"
    name: string;
    placeholderText: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
}

const InputBox: React.FC<InputBoxProps> = ({ type = "input", name, placeholderText, value, onChange }) => {
  return type == "input" ? (
    <input
      className={styles.inputBox}
      name={name}
      type="text"
      placeholder={placeholderText}
      value={value}
      onChange={onChange}
    />
  ) : (
    <textarea
      className={styles.inputBox}
      name={name}
      placeholder={placeholderText}
      value={value}
      rows={7}
      onChange={onChange}
    />
  );
};

export default InputBox;