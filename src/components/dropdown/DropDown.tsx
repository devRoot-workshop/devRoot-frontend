import React from 'react';
import styles from './DropDown.module.css';

interface Option {
    value: string;
    display: string;
}

interface DropDownProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
}

const DropDown: React.FC<DropDownProps> = ({ name, value, onChange, options }) => {
    return (
        <select
            name={name}
            className={styles.customSelect}
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.display}
                </option>
            ))}
        </select>
    );
};

export default DropDown;