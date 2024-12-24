import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './AddTag.module.css';

interface AddTagProps {
    tags: TagType[];
    onAdd: (id: number) => void;
}

const AddTag: React.FC<AddTagProps> = ({ tags, onAdd }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const toggleDropdown = () => {
        if (!isDropdownVisible && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
            });
        }
        setDropdownVisible((prev) => !prev);
    };

    useEffect(() => {
        if (isDropdownVisible) {
            const handleClickOutside = (event: MouseEvent) => {
                if (!buttonRef.current?.contains(event.target as Node)) {
                    //setDropdownVisible(false);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownVisible]);

    return (
        <>
        <button
            type='button'
            ref={buttonRef}
            className={styles.addButton}
            onClick={toggleDropdown}
            aria-expanded={isDropdownVisible}
        >
            +
        </button>
        {isDropdownVisible &&
            ReactDOM.createPortal(
            <div
                className={styles.dropdown}
                style={{
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                }}
            >
                {tags.map((tag) => (
                    <div
                        key={tag.id}
                        className={styles.tagItem}
                        onClick={() => { onAdd(tag.id); toggleDropdown()}}
                        style={{ cursor: 'pointer' }}
                    >
                        <strong>{tag.name}</strong>
                        {tag.description && <p>{tag.description}</p>}
                    </div>
                    ))}

            </div>,
            document.body
            )}
        </>
    );
};

export default AddTag;
