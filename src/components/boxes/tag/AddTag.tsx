import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './AddTag.module.css';
import axios from 'axios';

interface AddTagProps {
    tags: TagType[];
    setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
}

const AddTag: React.FC<AddTagProps> = ({ tags, setTags }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });
    const [showAbove, setShowAbove] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [fetchedTags, setFetchedTags] = useState<TagType[]>([]);

    const calculatePosition = () => {
        if (!buttonRef.current || !dropdownRef.current) return;

        const buttonRect = buttonRef.current.getBoundingClientRect();
        const dropdownHeight = dropdownRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        
        const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
        setShowAbove(shouldShowAbove);

        setDropdownPosition({
            left: buttonRect.left + window.scrollX,
            top: shouldShowAbove 
                ? buttonRect.top + window.scrollY - dropdownHeight 
                : buttonRect.bottom + window.scrollY
        });
    };

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };

    useEffect(() => {
        if (isDropdownVisible) {
            // Initial position calculation
            calculatePosition();

            // Recalculate on window resize
            window.addEventListener('resize', calculatePosition);
            window.addEventListener('scroll', calculatePosition);

            const handleClickOutside = (event: MouseEvent) => {
                if (!buttonRef.current || !dropdownRef.current) return;
                
                const target = event.target as Node;
                
                if (!buttonRef.current.contains(target) && 
                    !dropdownRef.current.contains(target)) {
                    setDropdownVisible(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                window.removeEventListener('resize', calculatePosition);
                window.removeEventListener('scroll', calculatePosition);
            };
        }
    }, [isDropdownVisible]);

    const handleTagAdd = (id: number) => {
        const tagToAdd = fetchedTags.find((tag) => tag.id === id);
        if (tagToAdd && !tags.some((tag) => tag.id === id)) {
            setTags(prevTags => [...prevTags, tagToAdd]);
        }
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get("http://localhost:8080/Tag/GetTags");
                const tags = response.data.map((tag: { id: number; name: string }) => ({
                    id: tag.id,
                    name: tag.name,
                }));
                setFetchedTags(tags);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();

    }, []);

    return (
        <>
            <button
                type="button"
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
                        ref={dropdownRef}
                        className={`${styles.dropdown} ${showAbove ? styles.dropdownAbove : styles.dropdownBelow}`}
                        style={{
                            position: 'absolute',
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                        }}
                    >
                        {fetchedTags.map((tag) => (
                            <div
                                key={tag.id}
                                className={styles.tagItem}
                                onClick={() => { handleTagAdd(tag.id); toggleDropdown(); }}
                                style={{ cursor: 'pointer' }}
                            >
                                <p>{tag.name}</p>
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
