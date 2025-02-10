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
import Container from "@/components/boxes/container/Container";

const UploadPage: React.FC = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState<Partial<QuestType>>({
        title: "",
        taskDescription: "",
        exampleCodes: [],
        console: "",
        difficulty: 0,
        availableLanguages: [],
        tags: []
    });
    const [tags, setTags] = useState<TagType[]>([]);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState("Feladat");
    const [currentCode, setCurrentCode] = useState("");
    const [currentLanguage, setCurrentLanguage] = useState("python");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "difficulty" ? Number(value) : value,
        }));
    };

    const handleDifficultyChange = (value: number) => {
        setFormData(prev => ({
            ...prev,
            difficulty: value,
        }));
    };

    const handleAddExampleCode = () => {
        console.log(currentCode, currentLanguage)
        if (!currentCode || !currentLanguage) return;
        const newExample: ExampleCodeType = {
            code: currentCode,
            language: currentLanguage
        };

        setFormData(prev => ({
            ...prev,
            exampleCodes: [...(prev.exampleCodes || []), newExample],
            availableLanguages: Array.from(new Set([...prev.availableLanguages || [], currentLanguage]))
        }));

        setCurrentCode("");
    };

    const handleDeleteExample = (index: number) => {
        const newExamples = [...(formData.exampleCodes || [])];
        newExamples.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            exampleCodes: newExamples,
            availableLanguages: Array.from(new Set(newExamples.map(ex => ex.language)))
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const requestData = {
            id: 0,
            title: formData.title || "",
            taskDescription: formData.taskDescription || "",
            exampleCodes: formData.exampleCodes || [],
            console: formData.console || "",
            difficulty: formData.difficulty || 0,
            availableLanguages: formData.availableLanguages || [],
            created: new Date().toISOString(),
            tagId: tags.map(tag => tag.id)
        };
    
        try {
            const response = await axios.post(
                `http${secure ? "s" : ""}://${domain}:${port}/Quest/CreateQuest`,
                requestData,
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
            title: "",
            taskDescription: "",
            exampleCodes: [],
            console: "",
            difficulty: 0,
            availableLanguages: [],
            tags: []
        });
        setTags([]);
        setSubmissionSuccess(false);
    };

    if (submissionSuccess) {
        return (
            <div className={styles.container}>
                <div className={styles.tabHeader}>
                    <button className={`${styles.tab} ${styles.activeTab}`}>Feladat</button>
                    <button className={styles.tab}>Megoldások</button>
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
            
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                {activeTab === 'Feladat' && (
                    <>
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
                    </>
                )}

                {activeTab === 'Megoldások' && (
                    <>
                        <h1 className={styles.pageTitle}>Példák</h1>
                        <p className="tag-text">Konzol kimenet példa</p>
                        <InputBox
                            type="textarea"
                            name="console"
                            onChange={handleChange}
                            value={formData.console!}
                            placeholderText={"BEMENET: XY\nKIMENET: YX"}
                        />
                        <br/>
                        <p className="tag-text">Kód megoldás példák</p>
                        <Container padding="25px" direction="vertical" alignment="start">
                            <div className={styles.solutionInputSection}>
                                <InputBox
                                    type="textarea"
                                    name="exampleCode"
                                    value={currentCode}
                                    onChange={(e) => setCurrentCode(e.target.value)}
                                    placeholderText="Kód"
                                />
                                <DropDown
                                    name="Language"
                                    value={currentLanguage}
                                    onChange={(e) => setCurrentLanguage(e.target.value)}
                                    options = {[
                                        { value: "python", display: "Python" },
                                        { value: "csharp", display: "C#" },
                                        { value: "nextjs", display: "NextJS" },
                                        { value: "java", display: "Java" },
                                        { value: "cpp", display: "C++" },
                                        { value: "c", display: "C" }
                                    ]}
                                />
                                <Button 
                                    size="small" 
                                    color="pale" 
                                    type="button"
                                    onClick={handleAddExampleCode}
                                >
                                    Hozzáadás
                                </Button>
                            </div>

                            <hr className={styles.divider} />

                            <div className={styles.solutionsList}>
                                {formData.exampleCodes?.map((example, index) => (
                                    <div key={index} className={styles.solutionItem}>
                                        <div className={styles.solutionHeader}>
                                            <span className={styles.languageTag}>
                                                {example.language}
                                            </span>
                                            <Button
                                                size="small"
                                                color="pale"
                                                type="button"
                                                onClick={() => handleDeleteExample(index)}
                                            >
                                                Törlés
                                            </Button>
                                        </div>
                                        <pre className={styles.codeBlock}>
                                            {example.code}
                                        </pre>
                                    </div>
                                ))}
                                {formData.exampleCodes?.length === 0 && (
                                    <p className={styles.noSolutions}>Nincsenek hozzáadott megoldások</p>
                                )}
                            </div>
                        </Container>
                    </>
                )}

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