"use client"

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/authContext";

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
            tagId: formData.tags.map(tag => parseInt(tag.id)),
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
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    className="text-black"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Task Description:
                <textarea
                    className="text-black"
                    name="taskDescription"
                    value={formData.taskDescription}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UploadPage;
