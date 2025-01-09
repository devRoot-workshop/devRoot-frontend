import React, { ChangeEventHandler } from "react";
import styles from "./InputBox.module.css";

interface InputBoxProps {
    type?: "input" | "textarea";
    name?: string;
    placeholderText?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    icon?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
    type = "input",
    name = "input",
    placeholderText = "input",
    value,
    onChange,
    icon = "",
}) => {
    return type === "input" ? (
        <div className={`${styles.inputWrapper} ${icon ? styles.withIcon : ""}`}>
            <input
                className={styles.inputBox}
                name={name}
                type="text"
                placeholder={placeholderText}
                value={value}
                onChange={onChange}
            />
            {icon && <span className={styles.icon}>{icon}</span>}
        </div>
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
