"use client"

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/authContext";
import Header from "@/components/header/Header";
import InputBox from "@/components/boxes/input/InputBox";
import styles from "./page.module.css";
import Button from "@/components/button/Button";

const UploadPage: React.FC = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState<QuestType>({
        title: "",
        taskDescription: "",
        created: new Date().toISOString().split("T")[0],
        tags: [{ id: "0" }],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const convertedFormData = {
            title: formData.title,
            taskDescription: formData.taskDescription,
            created: formData.created,
            tagId: formData.tags.map((tag) => parseInt(tag.id)),
        };

        try {
            const response = await axios.post(
                `http://localhost:8080/Quest/CreateQuest`,
                convertedFormData,
                { 
                    headers: { 
                        Authorization: `Bearer ${await user?.getIdToken()}`,
                        Accept: 'text/plain'
                    } 
                }
            );
            console.log("Response data:", response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div>
            <Header />
            <form className={styles.container} onSubmit={handleSubmit}>
                <h1 className={styles.pageTitle}>Feladat feltöltése</h1>
                <InputBox 
                    name="title" 
                    onChange={handleChange} 
                    value={formData.title} 
                    placeholderText="Title"
                />
                <InputBox 
                    type="textarea"
                    name="taskDescription" 
                    onChange={handleChange} 
                    value={formData.taskDescription} 
                    placeholderText="Description"
                />
                <Button type="button" size="small" color="pale">Fájl hozzáadása</Button>

                <div className={styles.buttonGroup}>
                    <Button type="submit" size="large">Feltöltés</Button>
                </div>
            </form>
        </div>
    );
};

export default UploadPage;
