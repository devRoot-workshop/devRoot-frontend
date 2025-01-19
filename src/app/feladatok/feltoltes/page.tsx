"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/authContext";
import InputBox from "@/components/boxes/input/InputBox";
import styles from "./page.module.css";
import Button from "@/components/button/Button";
import TagContainer from "@/components/boxes/tag/TagContainer";
import TagComponent from "@/components/boxes/tag/TagComponent";
import AddTag from "@/components/boxes/tag/AddTag";
import DropDown from "@/components/dropdown/DropDown";
import { domain } from "@/lib/global/global";

const UploadPage: React.FC = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState<Partial<QuestType>>({
        id: 0,
        title: "",
        taskDescription: "",
        difficulty: 0,
        created: new Date().toISOString(), 
        code: "",
        console: "",
        language: 0,
    });
    const [tags, setTags] = useState<TagType[]>([]);

    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "difficulty" ? Number(value) : value,
        }));
    };

    const handleDifficultyChange = (value: number) => {
        setFormData((prev) => ({
            ...prev,
            difficulty: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const convertedFormData = {
            difficulty: formData.difficulty,
            title: formData.title,
            taskDescription: formData.taskDescription,
            created: formData.created,
            tagId: tags.map((tag) => tag.id),
        };

        try {
            const response = await axios.post(
                `http://${domain}:8080/Quest/CreateQuest`,
                convertedFormData,
                {
                    headers: {
                        Authorization: `Bearer ${await user?.getIdToken()}`,
                        Accept: "text/plain",
                    },
                }
            );
            console.log("Response data:", response.data);
            setSubmissionSuccess(true);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const newUpload = () => {
        setFormData({
            id: 0,
            title: "",
            taskDescription: "",
            difficulty: 0,
            created: new Date().toISOString(), 
            code: "",
            console: "",
            language: 0,
            tags: [],
        });
        setSubmissionSuccess(false);
    };

    if (submissionSuccess) {
        return (
            <div>
                <div className={styles.container}>
                    <h1>Feltöltés sikeres!</h1>
                    <Button type="button" size="large" onClick={newUpload}>
                        Új feltöltés
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <form className={styles.container} onSubmit={handleSubmit}>
                <h1 className={styles.pageTitle}>Feladat feltöltése</h1>
                <InputBox
                    name="title"
                    onChange={handleChange}
                    value={formData.title!}
                    placeholderText="Title"
                />
                <InputBox
                    type="textarea"
                    name="taskDescription"
                    onChange={handleChange}
                    value={formData.taskDescription!}
                    placeholderText="Description"
                />
                <div className={styles.row}>
                    <DropDown
                        name="difficulty"
                        value={formData.difficulty!.toString()}    
                        onChange={(e) => handleDifficultyChange(Number(e.target.value))}
                        options={[
                            { value: "0", display: "Könnyű" },
                            { value: "1", display: "Közepes" },
                            { value: "2", display: "Nehéz" },
                        ]}
                    />
                    <TagContainer>
                        {tags.map((tag) => (
                            <TagComponent
                                key={tag.id}
                                id={tag.id}
                                text={tag.name}
                                setTags={setTags}
                            />
                        ))}
                        <AddTag setTags={setTags} tags={tags} />
                    </TagContainer>
                </div>
                <Button type="button" size="small" color="pale">
                    Fájl hozzáadása
                </Button>

                <div className={styles.buttonGroup}>
                    <Button type="submit" size="large">
                        Feltöltés
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UploadPage;
