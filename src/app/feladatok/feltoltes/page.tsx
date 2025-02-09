"use client"
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/authContext";
import InputBox from "@/components/boxes/input/InputBox";
import styles from "./page.module.css";
import Button from "@/components/button/Button";
import TagComponent from "@/components/boxes/tag/TagComponent";
import AddTag from "@/components/boxes/tag/AddTag";
import DropDown from "@/components/dropdown/DropDown";
import { domain, port, secure } from "@/lib/global/global";
import DescriptionBox from "@/components/boxes/description/DescriptionBox";
import Container from "@/components/boxes/container/Container";

interface QuestType {
    id: number;
    title: string;
    taskDescription: string;
    exampleCodes: ExampleCodeType[];
    console: string;
    difficulty: number;
    availableLanguages: string[];
    created: string;
    tags: TagType[];
}

const UploadPage: React.FC = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState<Partial<QuestType>>({
        id: 0,
        title: "",
        taskDescription: "",
        exampleCodes: [],
        console: "",
        difficulty: 0,
        availableLanguages: [],
        created: new Date().toISOString(),
        tags: []
    });
    const [tags, setTags] = useState<TagType[]>([]);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState("Feladat");

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
        const questData: QuestType = {
            id: formData.id ?? 0,
            title: formData.title ?? "",
            taskDescription: formData.taskDescription ?? "",
            exampleCodes: formData.exampleCodes ?? [],
            console: formData.console ?? "",
            difficulty: formData.difficulty ?? 0,
            availableLanguages: formData.availableLanguages ?? [],
            created: formData.created ?? new Date().toISOString(),
            tags: tags
        };
        try {
            const response = await axios.post(
                `http${secure ? "s" : ""}://${domain}:${port}/Quest/CreateQuest`,
                questData,
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
            exampleCodes: [],
            console: "",
            difficulty: 0,
            availableLanguages: [],
            created: new Date().toISOString(),
            tags: []
        });
        setSubmissionSuccess(false);
    };

    if (submissionSuccess) {
        return (
            <div>
                <div className={styles.tabHeader}>
                    <button
                        className={activeTab === 'Feladat' ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab('Feladat')}
                    >
                        Feladat
                    </button>
                    <button
                        className={activeTab === 'Megoldások' ? styles.activeTab : styles.tab}
                        onClick={() => setActiveTab('Megoldások')}
                    >
                        Megoldások
                    </button>
                </div>
                <div className={styles.formContainer}>
                    <h1>Feltöltés sikeres!</h1>
                    <Button type="button" size="large" onClick={newUpload}>
                        Új feltöltés
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.tabHeader}>
                <button
                    className={activeTab === 'Feladat' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('Feladat')}
                >
                    Feladat
                </button>
                <button
                    className={activeTab === 'Megoldások' ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab('Megoldások')}
                >
                    Megoldások
                </button>
            </div>
            {activeTab === 'Feladat' && (
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <h1 className={styles.pageTitle}>Általános adatok</h1>
                    <InputBox
                        name="title"
                        onChange={handleChange}
                        value={formData.title!}
                        placeholderText="Cím"
                    />
                    <InputBox
                        type="textarea"
                        name="taskDescription"
                        onChange={handleChange}
                        value={formData.taskDescription!}
                        placeholderText="Leírás"
                    />
                    <br/>
                    <p className="tag-text">Címkék</p>
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
                        <Container padding="10px 12px">
                            {tags.map((tag) => (
                                <TagComponent
                                    key={tag.id}
                                    id={tag.id}
                                    text={tag.name}
                                    setTags={setTags}
                                />
                            ))}
                            <AddTag setTags={setTags} tags={tags} />
                        </Container>
                    </div>
                </form>
            )}
            {activeTab === 'Megoldások' && (
                <div className={styles.formContainer}>
                    <h1 className={styles.pageTitle}>Példák</h1>
                    <p className="tag-text">Konzol kimenet példa</p>
                    <InputBox
                        type="textarea"
                        name="console"
                        onChange={handleChange}
                        value={formData.taskDescription!}
                        placeholderText={"BEMENET: XY\nKIMENET: YX"}
                    />
                    <br/>
                    <p className="tag-text">Kód megoldás példák</p>
                    <Container padding="25px" direction="vertical" alignment="start">
                        <InputBox
                            type="textarea"
                            name="exampleCode"
                            onChange={handleChange}
                            value={formData.title!}
                            placeholderText="Kód"
                        />
                        <DropDown
                            name="Language"
                            value={"NextJS"}
                            onChange={(e) => handleDifficultyChange(Number(e.target.value))}
                            options={[
                                { value: "0", display: "NextJS" },
                                { value: "1", display: "Java" },
                                { value: "2", display: "C++" },
                            ]}
                        />
                        <Button size="small" color="pale">Hozzáadás</Button>
                    </Container>
                </div>
            )}
        </div>
    );
};

export default UploadPage;

/*

                    <div className={styles.buttonGroup}>
                        <Button type="submit" size="large">
                            Feltöltés
                        </Button>
                    </div>

*/